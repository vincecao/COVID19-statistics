import { motion } from "framer-motion";
import type { ReactElement, ReactNode,Ref } from "react";
import { forwardRef } from "react";

const BUTTON_VARIANTS = {
  hover: { scale: 1.05, transition: { duration: 0.4, yoyo: Infinity } },
};

type ButtonExtProps = {
  type: "span" | "anchor" | "button";
  children: ReactNode;
  className?: string;
  href?: string;
};

function ButtonExt({ type, children, className, href }: ButtonExtProps, ref: Ref<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>): ReactElement {
  switch (type) {
    case "span":
      return (
        <motion.span ref={ref as Ref<HTMLSpanElement>} variants={BUTTON_VARIANTS} whileHover="hover" className={className}>
          {children}
        </motion.span>
      );
    case "anchor":
      return (
        <motion.a ref={ref as Ref<HTMLAnchorElement>} href={href} rel="noreferrer" variants={BUTTON_VARIANTS} whileHover="hover" className={className}>
          {children}
        </motion.a>
      );
    default:
      return (
        <motion.button ref={ref as Ref<HTMLButtonElement>} variants={BUTTON_VARIANTS} whileHover="hover" className={className}>
          {children}
        </motion.button>
      );
  }
}

export default forwardRef(ButtonExt)