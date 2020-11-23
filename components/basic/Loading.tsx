import React from 'react';

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="has-background-white">
      <progress className="progress is-small is-warning" max="100">
        15%
      </progress>
      <div className="level mt-3">
        <div className="level-item has-text-centered">
          <p className="heading">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
