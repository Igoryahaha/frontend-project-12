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

  const getAuthHeader = useCallback(() => {
    if (userAuth && userAuth.token) {
      return { Authorization: `Bearer ${userAuth.token}` };
    }
    return {};
  }, [userAuth]);

  const getUsername = useCallback(() => userAuth?.username, [userAuth]);

  const authMapping = useMemo(() => ({
    401: (_, setFeedback) => {
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
    409: (_, setFeedback) => {
      setFeedback(true);
    },
  }), [logIn]);

  const authValue = useMemo(() => ({
    logIn, logOut, loggedIn, getAuthHeader, getUsername, authMapping,
  }), [logIn, logOut, loggedIn, getAuthHeader, getUsername, authMapping]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
