import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContainerProps {
  children: any;
  style?: {};
  variants?: {};
  isVisible?: boolean;
}

export const FixContainer: React.FC<ContainerProps> = ({ children, style = {}, variants = {}, isVisible = true }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            ...style,
          }}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
