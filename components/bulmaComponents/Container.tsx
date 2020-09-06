import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContainerProps {
  children: any;
  delay?: any;
  variants?: {};
  isVisible?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, delay = 0, variants, isVisible = true }) => {
  // const containerVariant = {
  //   hidden: {
  //     x: '100vw',
  //   },
  //   visible: {
  //     x: 0,
  //     transition: {
  //       delay,
  //     },
  //   },
  // };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div variants={variants} initial="hidden" animate="visible" className="section">
          <div className="container">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
    // isVisible && (
    //   <div className="section">
    //     <div className="container">{children}</div>
    //   </div>
    // )
  );
};
