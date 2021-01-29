import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import store from '../store/store';
import { APP } from '../common/constants';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, ProtectedRoute } from '../contexts/auth';

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
              <ChakraProvider>
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              </ChakraProvider>
            </AuthProvider>
          </Provider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
