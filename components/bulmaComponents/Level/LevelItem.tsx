import React from 'react';
import { motion } from 'framer-motion';

interface LevelItemProps {
  itemHeading: string;
  itemTitle: string;
  itemSubtitle?: string;
  isItemSubtitleItalic?: boolean;
}

export const LevelItem: React.FC<LevelItemProps> = ({
  itemHeading,
  itemTitle,
  itemSubtitle = '',
  isItemSubtitleItalic = false,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      className="level-item has-text-centered"
    >
      <div>
        <p className="heading">{itemHeading}</p>
        <h1 className="title is-spaced">{itemTitle}</h1>

        {isItemSubtitleItalic && (
          <h6 className="subtitle is-6">
            <i>{itemSubtitle}</i>
          </h6>
        )}
        {!isItemSubtitleItalic && <h2 className="subtitle">{itemSubtitle}</h2>}
      </div>
    </motion.div>
  );
};
