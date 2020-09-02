import React from 'react';

interface MyFooterProps {}

export const MyFooter: React.FC<MyFooterProps> = ({}) => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>{'COVID19-statistics'}</strong>
          {' by '}
          <a href="https://vince-amazing.com" target="_blank" rel="noreferrer">
            <i>{'vincec'}</i>
          </a>
          {'. The source code is licensed '}
          <a href="http://opensource.org/licenses/mit-license.php">{'MIT'}</a>
          {'. The website content is licensed '}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">{'CC BY NC SA 4.0'}</a>.
        </p>
      </div>
    </footer>
  );
};
