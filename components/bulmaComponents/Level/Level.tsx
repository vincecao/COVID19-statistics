import React from 'react';

interface LevelProps {
  children: any;
  bottomText?: string;
}

export const Level: React.FC<LevelProps> = ({ children, bottomText = '' }) => {
  return (
    <>
      <nav className="level">{children}</nav>
      {bottomText && (
        <div className="level mt-3">
          <div className="level-item has-text-centered">
            <p className="heading">{bottomText}</p>
          </div>
        </div>
      )}
    </>
  );
};
