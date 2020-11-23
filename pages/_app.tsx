import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { ReactQueryDevtools } from 'react-query-devtools';
import RouteContextProvider from '@contexts/routeContext';
import { Nav } from '@components/layout/nav/Nav';
import { HtmlHeader } from '@components/layout/html/htmlHeader';
import { Footer } from '@components/layout/footer/Footer';
import Header from '@components/layout/header/Header';
import 'bulma/css/bulma.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <RouteContextProvider route={router.route}>
        <HtmlHeader />
        <Nav />
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={`compo-${router.route}`} />
        </AnimatePresence>
        <Footer />
        <ReactQueryDevtools initialIsOpen />
      </RouteContextProvider>
    );
  }
}

export default MyApp;
