import React from 'react';
import { motion } from 'framer-motion';

interface MyFooterProps {}

const footerVariants = {
  hidden: {
    scale: 0.5,
    y: `100vw`,
  },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
    },
  },
};

export const MyFooter: React.FC<MyFooterProps> = ({}) => {
  return (
    <motion.footer variants={footerVariants} initial="hidden" animate="visible" className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>{'COVID19-statistics'}</strong>
          {' by '}
          <a href="https://vince-amazing.com" target="_blank" rel="noreferrer">
            <i>{'vincec'}</i>
          </a>
          {'. The source code is licensed '}
          <a href="http://opensource.org/licenses/mit-license.php">{'MIT'}</a>
          {'. The website content is licensed '}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">{'CC BY NC SA 4.0'}</a>.
        </p>
      </div>
    </motion.footer>
  );
};
