import React from 'react';

interface CardProps {
  header?: string;
  cardContent?: any;
}

export const Card: React.FC<CardProps> = ({ header = '', cardContent = <></> }) => {
  return (
    <div className="card">
      {header && (
        <header className="card-header">
          <p className="card-header-title">{header}</p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
      )}
      <div className="card-content">{cardContent}</div>
      <footer className="card-footer"></footer>
    </div>
  );
};
