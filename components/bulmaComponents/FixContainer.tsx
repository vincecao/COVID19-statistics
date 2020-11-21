import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface ContainerProps {
  children: any;
  z?: number;
  variants?: {};
  isVisible?: boolean;
}

const StickyNav = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

export const FixContainer: React.FC<ContainerProps> = ({ children, z = '', variants = {}, isVisible = true }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <StickyNav style={{ z }} variants={variants} initial="hidden" animate="visible" exit="exit">
          {children}
        </StickyNav>
      )}
    </AnimatePresence>
  );
};
