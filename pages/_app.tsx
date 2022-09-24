import App from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import classNames from "classnames";
import "bulma/css/bulma.css";
import "../styles/index.css";

import Button from "../components/Button";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function HtmlHeader() {
  return (
    <Head>
      <title>COVID19 | Statistics</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </Head>
  );
}

const HEADER_ITEM_VARIANTS = (index: number) => ({
  hidden: { scale: 0.5, x: "-100vw" },
  visible: { scale: 1, x: 0, transition: { type: "spring", mass: 0.4, damping: 10, delay: 0.05 * index } },
});

export function Navigation() {
  const { pathname } = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item has-background-black">
            <motion.img variants={HEADER_ITEM_VARIANTS(0)} initial="hidden" animate="visible" src="//avatars1.githubusercontent.com/u/17363908?s=460&u=1d1a597b0eae2c71ff30cc852056bd869a0450f6&v=4" height="20" />
          </a>
        </Link>

        <a role="button" className={classNames("navbar-burger burger", { "is-active": isDropDownOpen })} aria-label="menu" aria-expanded="false" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={classNames("navbar-menu", { "is-active": isDropDownOpen })}>
        <div className="navbar-start">
          <Link href="/">
            <motion.a variants={HEADER_ITEM_VARIANTS(0)} initial="hidden" animate="visible" className={classNames("navbar-item", { "is-active": pathname === "/" })}>
              Global
            </motion.a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <motion.div variants={HEADER_ITEM_VARIANTS(1)} initial="hidden" animate="visible" className="buttons">
              <Button type="anchor" href="//www.who.int/emergencies/diseases/novel-coronavirus-2019" text="COVID-19" color="dark" />
            </motion.div>
          </div>
          <div className="navbar-item has-background-black">
            <motion.div variants={HEADER_ITEM_VARIANTS(2)} initial="hidden" animate="visible" className="buttons">
              <Button type="anchor" icon={faGithub} href="//github.com/vincecao/COVID19-statistics" color="black" />
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Header() {
  return (
    <section className="hero is-dark is-small">
      <div className="hero-body">
        <motion.div variants={HEADER_ITEM_VARIANTS(1)} initial="hidden" animate="visible" className="container">
          <h1 className="title">COVID 19</h1>
          <h2 className="subtitle">Statistics</h2>
          <motion.nav variants={HEADER_ITEM_VARIANTS(1)} initial="hidden" animate="visible" className="level">
            <div className="level-left">
              <div className="level-item"> </div>
            </div>
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
}

const FOOTER_VARIANTS = {
  hidden: { scale: 0.5, y: "100vw" },
  visible: { scale: 1, y: 0, transition: { type: "spring", mass: 0.4, damping: 10 } },
};

function Footer() {
  return (
    <motion.footer variants={FOOTER_VARIANTS} initial="hidden" animate="visible" className="footer has-background-black">
      <div className="content has-text-centered has-text-white">
        <p>
          Made by{" "}
          <a className="has-text-warning" href="//vince-amazing.com" target="_blank" rel="noreferrer">
            <i>vincec</i>
          </a>
          . The source code is licensed{" "}
          <a className="has-text-warning" href="//opensource.org/licenses/mit-license.php">
            MIT
          </a>
          .
        </p>
      </div>
    </motion.footer>
  );
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <div className="has-background-black">
        <HtmlHeader />
        <Navigation />
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={`compo-${router.route}`} />
        </AnimatePresence>
        <Footer />
      </div>
    );
  }
}
