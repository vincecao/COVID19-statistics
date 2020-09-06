import React from 'react';
import { motion } from 'framer-motion';

interface CardItemProps {
  tagIntent: string;
  tagHeading: string;
  tagContent: string;
  variants: {};
}

export const CardItem: React.FC<CardItemProps> = ({ tagIntent, tagHeading, tagContent, variants }) => {
  return (
    <motion.div className="control" variants={variants} initial="hidden" animate="visible">
      <div className="tags has-addons">
        <span className="tag is-dark">{tagHeading}</span>
        <span className={`tag is-${tagIntent}`}>{tagContent}</span>
      </div>
    </motion.div>
  );
};
