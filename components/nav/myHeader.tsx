import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MyHeaderProps {
  route: string;
}

const setHeaderItemVariants = (index: number) => ({
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

const usDomasticRedirectVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.5,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      yoyo: Infinity,
    },
  },
};

export const MyHeader: React.FC<MyHeaderProps> = ({ route }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(route);
  }, [route]);

  return (
    <>
      <nav
        className="navbar is-warning"
        style={{ background: '#fbecb0' }}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item" style={{ background: 'white' }}>
              <motion.img
                variants={setHeaderItemVariants(0)}
                initial="hidden"
                animate="visible"
                src="https://avatars1.githubusercontent.com/u/17363908?s=460&u=1d1a597b0eae2c71ff30cc852056bd869a0450f6&v=4"
                height="20"
              />
            </a>
          </Link>

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
            <Link href="/">
              <motion.a
                variants={setHeaderItemVariants(0)}
                initial="hidden"
                animate="visible"
                className={`navbar-item ${pathname === '/' ? 'is-active' : ''}`}
              >
                Global
              </motion.a>
            </Link>
            <Link href="/uscase">
              <motion.a
                variants={setHeaderItemVariants(0)}
                initial="hidden"
                animate="visible"
                className={`navbar-item ${pathname === '/uscase' ? 'is-active' : ''}`}
              >
                US Domastic
              </motion.a>
            </Link>
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
              <motion.div variants={setHeaderItemVariants(1)} initial="hidden" animate="visible" className="buttons">
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  className="button is-light"
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>Lean COVID-19 on WHO</strong>
                </motion.a>
              </motion.div>
            </div>
            <div className="navbar-item">
              <motion.div variants={setHeaderItemVariants(2)} initial="hidden" animate="visible" className="buttons">
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  className="button is-dark"
                  href="https://github.com/vincecao/COVID19-statistics"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-github"></i>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-warning is-medium">
        <div className="hero-body">
          <motion.div variants={setHeaderItemVariants(1)} initial="hidden" animate="visible" className="container">
            <h1 className="title">Covid 19 Statistics</h1>
            <h2 className="subtitle">with latest realtime data</h2>
            <motion.nav variants={setHeaderItemVariants(1)} initial="hidden" animate="visible" className="level">
              <div className="level-left">
                <div className="level-item">
                  <h6 className="subtitle is-6">
                    <i>More features coming soon...</i>
                  </h6>
                </div>
              </div>
              <AnimatePresence>
                {pathname != '/uscase' && (
                  <motion.div
                    variants={usDomasticRedirectVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="level-right"
                  >
                    <div className="level-item">
                      <p className="subtitle is-6">
                        <strong>Want to check more around domastic?</strong>
                      </p>
                    </div>
                    <div className="level-item">
                      <Link href="/uscase">
                        <motion.button variants={buttonVariants} whileHover="hover" className="button is-small is-dark">
                          <span>US Domastic</span>
                          <span className="icon is-small">
                            <i className="fas fa-arrow-right"></i>
                          </span>
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          </motion.div>
        </div>
      </section>
    </>
  );
};
