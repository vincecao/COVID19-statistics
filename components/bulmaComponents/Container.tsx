import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContainerProps {
  children: any;
  variants?: {};
  isVisible?: boolean;
  animatekey?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variants,
  isVisible = true,
  animatekey = undefined,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={animatekey}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="section"
        >
          <div className="container">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
