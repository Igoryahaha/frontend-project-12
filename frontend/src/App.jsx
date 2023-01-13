import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import Login from './components/LoginPage';
import ErrorPage from './components/ErrorPage';

const App = () => (
  <React.StrictMode>
    <Router>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path={routes.login()} errorElement={<ErrorPage />}>
            <Route index element={<Login />} />
          </Route>
          <Route path={routes.notFound()} element={<ErrorPage />} />

        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

export default App;
