import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface StickyDisplayCardProps {
  children: any;
  areaHeading: string;
  areaImgSrc?: string;
  areaImgStyle?: {};
  updateTimeInfo: string;
  variants: {};
}

const AeraImage = styled(motion.img)`
  width: auto;
  height: 64px;
`;

export const StickyDisplayCard: React.FC<StickyDisplayCardProps> = ({
  areaHeading,
  updateTimeInfo,
  areaImgSrc = '',
  children,
  variants,
}) => {
  return (
    <div className="box">
      <article className="media">
        {areaImgSrc && (
          <div className="media-left">
            <AeraImage variants={variants} initial="hidden" animate="visible" src={areaImgSrc} alt="Image" />
          </div>
        )}
        <div className="media-content">
          <div className="content">
            <motion.p variants={variants} initial="hidden" animate="visible">
              <strong>{areaHeading}</strong> <small>{updateTimeInfo}</small>
            </motion.p>
            <div className="field is-grouped is-grouped-multiline">{children}</div>
          </div>
        </div>
      </article>
    </div>
  );
};
