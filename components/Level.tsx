import type { ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";

type LevelProps = {
  children: ReactNode;
};

export function Level({ children }: LevelProps): ReactElement {
  return <div className="level">{children}</div>;
}

interface ItemProps {
  heading: string;
  value: string;
  newIncreased?: string;
}

export function Item({ heading, value, newIncreased }: ItemProps): ReactElement {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="level-item has-text-centered has-text-light">
      <div>
        <p className="heading">
          {heading} {newIncreased}
        </p>
        <h1 className="title is-spaced has-text-white">{value}</h1>
      </div>
    </motion.div>
  );
}
