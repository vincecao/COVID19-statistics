import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ style = {} }) => {
  return (
    <div style={style}>
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

Loading.propTypes = {};

export default Loading;
