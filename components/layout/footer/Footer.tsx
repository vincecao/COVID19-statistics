import React from 'react';
import { motion } from 'framer-motion';
import { footerVariants } from '@variants/data';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <motion.footer variants={footerVariants} initial="hidden" animate="visible" className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>{'COVID19-statistics'}</strong>
          {' by '}
          <a href="//vince-amazing.com" target="_blank" rel="noreferrer">
            <i>{'vincec'}</i>
          </a>
          {'. The source code is licensed '}
          <a href="//opensource.org/licenses/mit-license.php">{'MIT'}</a>
          {'. The website content is licensed '}
          <a href="//creativecommons.org/licenses/by-nc-sa/4.0/">{'CC BY NC SA 4.0'}</a>.
        </p>
      </div>
    </motion.footer>
  );
};
