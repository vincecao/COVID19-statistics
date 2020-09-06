import React from 'react';
import { motion } from 'framer-motion';

interface ContainerProps {
  children: any;
  style?: {};
  variants?: {};
  isVisible?: boolean;
}

export const FixContainer: React.FC<ContainerProps> = ({ children, style = {}, variants = {}, isVisible = true }) => {
  return (
    isVisible && (
      <motion.div
        style={{
          ...style,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
        }}
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    )
  );
};
