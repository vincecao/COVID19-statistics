import React, { useState, useEffect } from 'react';

interface MyHeaderProps {}

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
          <a className="navbar-item" style={{ background: 'white' }} href="https://covid-19-statistics.vercel.app/">
            <img
              src="https://avatars1.githubusercontent.com/u/17363908?s=460&u=1d1a597b0eae2c71ff30cc852056bd869a0450f6&v=4"
              height="28"
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
            <a className={`navbar-item ${pathname === '/' ? 'is-active' : ''}`} href="/">
              Global
            </a>
            <a className={`navbar-item ${pathname === '/uscase' ? 'is-active' : ''}`} href="/uscase">
              US Domastic
            </a>

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
              <div className="buttons">
                <a
                  className="button is-dark"
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                  target="_blank"
                >
                  <strong>Lean More on WHO</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-warning is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Covid 19 Statistics</h1>
            <h2 className="subtitle">A simple webpage display covid-19 latest statistics data</h2>
            {pathname != '/uscase' && (
              <>
                <h6 className="subtitle is-6">
                  <i>{`Want to check more around domastic?  `}</i>
                  <span className="icon has-text-dark">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <a className="is-link" href="/uscase">
                    <b>US Domastic</b>
                  </a>
                </h6>
                <h6 className="subtitle is-6"></h6>
              </>
            )}
            <h6 className="subtitle is-6">
              <i>More features coming soon...</i>
            </h6>
          </div>
        </div>
      </section>
    </>
  );
};
