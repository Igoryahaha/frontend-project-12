import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { Provider as RProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import AuthProvider from './contexts/AuthProvider';
import store from './slices/index.js';
import ChatApiProvider from './contexts/ChatProvider.jsx';
import App from './App.jsx';
import ru from './locales/ru';

const Init = () => {
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

  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',

      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RProvider config={rollbarConfig}>
          <ErrorBoundary>
            <ChatApiProvider socket={socket}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ChatApiProvider>
          </ErrorBoundary>
        </RProvider>

      </I18nextProvider>
    </Provider>
  );
};

export default Init;
