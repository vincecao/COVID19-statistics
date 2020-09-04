import React from 'react';

interface ContainerProps {
  children: any;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="section">
      <div className="container">{children}</div>
    </div>
  );
};
