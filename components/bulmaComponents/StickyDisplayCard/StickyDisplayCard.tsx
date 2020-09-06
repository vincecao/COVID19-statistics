import React from 'react';
import { motion } from 'framer-motion';

interface StickyDisplayCardProps {
  children: any;
  areaHeading: string;
  areaImgSrc?: string;
  areaImgStyle?: {};
  updateTimeInfo: string;
  variants: {};
}

export const StickyDisplayCard: React.FC<StickyDisplayCardProps> = ({
  areaHeading,
  updateTimeInfo,
  areaImgSrc = '',
  areaImgStyle = {},
  children,
  variants,
}) => {
  return (
    <div className="box">
      <article className="media">
        {areaImgSrc && (
          <div className="media-left">
            <motion.figure variants={variants} initial="hidden" animate="visible" className="image is-64x64">
              <img
                style={{
                  ...areaImgStyle,
                }}
                src={areaImgSrc}
                alt="Image"
              />
            </motion.figure>
          </div>
        )}
        <div className="media-content">
          <div className="content">
            <motion.p variants={variants} initial="hidden" animate="visible">
              <strong>{areaHeading}</strong> <small>{updateTimeInfo}</small>
            </motion.p>
            <div className="field is-grouped is-grouped-multiline">{children}</div>
            {/* <small>{selectCountry.state.code}</small>  */}
          </div>
        </div>
      </article>
    </div>
  );
};
