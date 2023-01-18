import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { Provider as RProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import routes from './routes';
import Login from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import useAuth from './hooks/useAuth.jsx';
import AuthProvider from './contexts/AuthProvider';
import store from './slices/index.js';
import Main from './components/MainPage';
import ChatApiProvider from './contexts/ChatApiProvider.jsx';
import Header from './components/Header';
import RenderModal from './components/modals';
import Registration from './components/RegistrationPage';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to={routes.login()} state={{ from: location }} />
  );
};

const App = () => {
  const socket = io();

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <Provider store={store}>
      <RProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ChatApiProvider socket={socket}>
            <AuthProvider>
              <Header />
              <Router>
                <div className="d-flex flex-column h-100">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <Main />
                        </PrivateRoute>
              }
                    />
                    <Route path={routes.login()} element={<Login />} />
                    <Route path={routes.signup()} element={<Registration />} />
                    <Route path={routes.notFound()} element={<ErrorPage />} />
                  </Routes>
                </div>
              </Router>
              <RenderModal />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AuthProvider>
          </ChatApiProvider>
        </ErrorBoundary>
      </RProvider>
    </Provider>);
};

export default App;
