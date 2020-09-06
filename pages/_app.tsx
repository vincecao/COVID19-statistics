import 'bulma/css/bulma.css';
import React from 'react';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { MyHeader } from '../components/nav/myHeader';
import { HtmlHeader } from '../components/basic/htmlHeader';
import { MyFooter } from '../components/footer/myFooter';
import { ReactQueryDevtools } from 'react-query-devtools';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <HtmlHeader />
        <MyHeader route={router.route} />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={`compo-${router.route}`} />
        </AnimatePresence>
        <MyFooter />
        <ReactQueryDevtools initialIsOpen />
      </>
    );
  }
}

export default MyApp;
