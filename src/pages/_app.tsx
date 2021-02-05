import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import store from '../store/store';
import { APP } from '../common/constants';
import { AuthProvider, ProtectedRoute } from '../contexts/auth';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import '../i18n/settings';
import 'antd/dist/antd.css';

Moment.globalMoment = moment;
Moment.globalTimezone = 'Asia/Dhaka';
Moment.globalFormat = 'D MMM YYYY (h:mm:ss A)';
Moment.globalLocale = 'bn_BD';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to {APP.name}!</title>
      </Head>
      <div>
        <main>
          <Provider store={store}>
            <AuthProvider>
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            </AuthProvider>
          </Provider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
