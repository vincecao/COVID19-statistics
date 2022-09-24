import React, { ReactNode, ReactElement } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, Variants } from "framer-motion";

type ContainerProps = {
  children: ReactNode;
  variants?: Variants;
  hidden?: boolean;
  animateKey?: string;
  className?: string
};

export default function Container({ children, variants, hidden, animateKey, className }: ContainerProps): ReactElement {
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div key={animateKey} variants={variants} initial="hidden" animate="visible" exit="exit" className={className || "section"}>
          <div className="container">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FixedContainerProps = {
  children: ReactNode;
  z?: number;
  variants?: Variants;
  hidden?: boolean;
}

export function FixedContainer({ children, z, variants, hidden }: FixedContainerProps) {
  return (
    <AnimatePresence>
      {!hidden && (
        <StickyNav style={{ z }} variants={variants} initial="hidden" animate="visible" exit="exit">
          {children}
        </StickyNav>
      )}
    </AnimatePresence>
  );
}

const StickyNav = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;