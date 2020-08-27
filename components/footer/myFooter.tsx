import React from 'react';

interface MyFooterProps {}

export const MyFooter: React.FC<MyFooterProps> = ({}) => {
  return (
    <footer className="has-text-centered mb-2">
      <p>
        {'copyright @ 2020 - '}
        <a href="//vince-amazing.com" target="_blank">
          vincec
        </a>
      </p>
    </footer>
  );
};
