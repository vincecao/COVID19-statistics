import React from 'react';
import PropTypes from 'prop-types';
import GlobalMap from './globalMap';

const MainGlobalCase = ({ data, onHover, onClick }) => {
  return (
    <div className="container">
      <div
        style={{
          overflowY: 'hidden',
          overflowX: 'auto',
        }}
      >
        <GlobalMap projectionScale={200} data={data} onHover={onHover} onClick={onClick} />
      </div>
    </div>
  );
};

MainGlobalCase.propTypes = {};

export default MainGlobalCase;
