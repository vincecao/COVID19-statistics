import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MyHeaderProps {}

const setHeaderItemVariant = (index: number) => ({
  hidden: {
    scale: 0.5,
    x: `-100vw`,
  },
  visible: {
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.1 * index,
    },
  },
});

export const MyHeader: React.FC<MyHeaderProps> = ({}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <>
      <nav
        className="navbar is-warning"
        style={{ background: '#fbecb0' }}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" style={{ background: 'white' }} href="/">
            <motion.img
              variants={setHeaderItemVariant(0)}
              initial="hidden"
              animate="visible"
              src="https://avatars1.githubusercontent.com/u/17363908?s=460&u=1d1a597b0eae2c71ff30cc852056bd869a0450f6&v=4"
              height="20"
            />
          </a>

          <a
            role="button"
            className={`navbar-burger burger ${isDropDownOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div style={{ background: '#fbecb0' }} className={`navbar-menu ${isDropDownOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <motion.a
              variants={setHeaderItemVariant(0)}
              initial="hidden"
              animate="visible"
              className={`navbar-item ${pathname === '/' ? 'is-active' : ''}`}
              href="/"
            >
              Global
            </motion.a>
            <motion.a
              variants={setHeaderItemVariant(0)}
              initial="hidden"
              animate="visible"
              className={`navbar-item ${pathname === '/uscase' ? 'is-active' : ''}`}
              href="/uscase"
            >
              US Domastic
            </motion.a>

            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div> */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <motion.div variants={setHeaderItemVariant(1)} initial="hidden" animate="visible" className="buttons">
                <a
                  className="button is-light"
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>Lean COVID-19 on WHO</strong>
                </a>
              </motion.div>
            </div>
            <div className="navbar-item">
              <motion.div variants={setHeaderItemVariant(2)} initial="hidden" animate="visible" className="buttons">
                <a
                  className="button is-dark"
                  href="https://github.com/vincecao/COVID19-statistics"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-warning is-medium">
        <div className="hero-body">
          <motion.div variants={setHeaderItemVariant(1)} initial="hidden" animate="visible" className="container">
            <h1 className="title">Covid 19 Statistics</h1>
            <h2 className="subtitle">with latest realtime data</h2>
            {pathname != '/uscase' && (
              <>
                <motion.h6
                  variants={setHeaderItemVariant(2)}
                  initial="hidden"
                  animate="visible"
                  // transition={{ delay: 0.7, type: 'spring', stiffness: 120 }}
                  className="subtitle is-6"
                >
                  <i>{`Want to check more around domastic?  `}</i>
                  <i className="fas fa-arrow-right"></i>
                  <a className="is-link" href="/uscase">
                    <b>US Domastic</b>
                  </a>
                </motion.h6>
              </>
            )}
            <h6 className="subtitle is-6">
              <i>More features coming soon...</i>
            </h6>
          </motion.div>
        </div>
      </section>
    </>
  );
};
