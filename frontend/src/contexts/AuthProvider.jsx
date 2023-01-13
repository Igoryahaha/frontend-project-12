import React, {
  createContext, useState, useMemo, useCallback,
} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth'));
  const initialState = (userAuth && userAuth.token);

  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = useCallback(() => setLoggedIn(true), []);
  const logOut = useCallback(() => {
    localStorage.removeItem('userAuth');
    setLoggedIn(false);
  }, []);

  const getAuthHeader = () => {
    if (userAuth && userAuth.token) {
      return { Authorization: `Bearer ${userAuth.token}` };
    }
    return {};
  };

  const getUsername = () => userAuth.username;

  const authMapping = {
    401: (authData, setFeedback) => {
      setFeedback(true);
    },
    200: (authData, setFeedback, navigate) => {
      setFeedback(false);
      logIn();
      const { data } = authData;
      localStorage.setItem('userAuth', JSON.stringify(data));
      navigate('/', { replace: true });
    },
    201: (authData, setFeedback, navigate) => {
      setFeedback(false);
      logIn();
      const { data } = authData;
      localStorage.setItem('userAuth', JSON.stringify(data));
      navigate('/', { replace: true });
    },
    409: (authData, setFeedback) => {
      setFeedback(true);
    },
  };

  const authValue = useMemo(() => ({
    logIn, logOut, loggedIn, getAuthHeader, getUsername, authMapping,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [loggedIn, logIn, logOut, getUsername, authMapping]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
