import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants, headerItemVariants } from '@variants/data';
import { RouteContext } from '@contexts/routeContext';
import GenericButton from '@components/basic/buttons/GenericButton';

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const { pathname } = useContext(RouteContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <nav className="navbar is-warning" style={{ background: '#fbecb0' }} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item has-background-white">
            <motion.img
              variants={headerItemVariants(0)}
              initial="hidden"
              animate="visible"
              src="//avatars1.githubusercontent.com/u/17363908?s=460&u=1d1a597b0eae2c71ff30cc852056bd869a0450f6&v=4"
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
              variants={headerItemVariants(0)}
              initial="hidden"
              animate="visible"
              className={`navbar-item ${pathname === '/' ? 'is-active' : ''}`}
            >
              Global
            </motion.a>
          </Link>
          <Link href="/uscase">
            <motion.a
              variants={headerItemVariants(0)}
              initial="hidden"
              animate="visible"
              className={`navbar-item ${pathname === '/uscase' ? 'is-active' : ''}`}
            >
              US Domestic
            </motion.a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <motion.div variants={headerItemVariants(1)} initial="hidden" animate="visible" className="buttons">
              <GenericButton
                type="anchor"
                text="COVID-19"
                href="//www.who.int/emergencies/diseases/novel-coronavirus-2019"
              />
            </motion.div>
          </div>
          <div className="navbar-item">
            <motion.div variants={headerItemVariants(2)} initial="hidden" animate="visible" className="buttons">
              <GenericButton
                type="anchor"
                fabIcon="github"
                href="//github.com/vincecao/COVID19-statistics"
                color="dark"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};
