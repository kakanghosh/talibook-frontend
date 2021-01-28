import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import store from '../store/store';
import { APP } from '../common/constants';
import { ChakraProvider } from '@chakra-ui/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to {APP.name}!</title>
      </Head>
      <div>
        <main>
          <Provider store={store}>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </Provider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
