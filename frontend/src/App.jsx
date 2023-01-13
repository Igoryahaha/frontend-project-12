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
import routes from './routes';
import Login from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import useAuth from './hooks/useAuth.jsx';
import AuthProvider from './contexts/AuthProvider';
import store from './slices/index.js';
import Main from './components/Main';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to={routes.login()} state={{ from: location }} />
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
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
            <Route path="/login" element={<Login />} />
            <Route path={routes.notFound()} element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
