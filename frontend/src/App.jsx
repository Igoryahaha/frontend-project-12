import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import routes from './routes';
import Login from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import useAuth from './hooks/useAuth.jsx';
import Main from './components/MainPage';
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

const App = () => (
  <>
    <Header />
    <Router>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>
                      )}
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
  </>
);

export default App;
