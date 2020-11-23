import { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RouteContext } from '@contexts/routeContext';
import { headerItemVariants, usDomesticRedirectVariants } from '@variants/data';
import GenericButton from '@components/basic/buttons/GenericButton';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { pathname } = useContext(RouteContext);

  return (
    <section className="hero is-warning is-medium">
      <div className="hero-body">
        <motion.div variants={headerItemVariants(1)} initial="hidden" animate="visible" className="container">
          <h1 className="title">Covid 19 Statistics</h1>
          <h2 className="subtitle">with latest realtime data</h2>
          <motion.nav variants={headerItemVariants(1)} initial="hidden" animate="visible" className="level">
            <div className="level-left">
              <div className="level-item">
                <h6 className="subtitle is-6">
                  <i>More features coming soon...</i>
                </h6>
              </div>
            </div>
            {pathname !== '/uscase' && (
              <motion.div
                variants={usDomesticRedirectVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="level-right"
              >
                <div className="level-item">
                  <p className="subtitle is-6">
                    <strong>Want to check more domestic cases?</strong>
                  </p>
                </div>
                <div className="level-item">
                  <Link href="/uscase" passHref>
                    <GenericButton type="anchor" text="US Domestic" fasIcon="arrow-right" small color="dark" />
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
