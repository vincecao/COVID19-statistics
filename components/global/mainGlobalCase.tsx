import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalMap from './globalMap';

const MainGlobalCase = ({ data, onHover, onClick }) => {
  const [pTranslationX, setPTranslationX] = useState(0.5);
  const [pTranslationY, setPTranslationY] = useState(0.55);
  const [pScale, setPScale] = useState(240);

  useEffect(() => {
    console.log(pScale);
  }, [pScale]);

  useEffect(() => {
    console.log(pTranslationY);
  }, [pTranslationY]);

  useEffect(() => {
    console.log(pTranslationX);
  }, [pTranslationX]);

  return (
    <>
      <div className="container">
        <div
          style={{
            overflowY: 'hidden',
            overflowX: 'auto',
          }}
        >
          <GlobalMap
            data={data}
            onHover={onHover}
            onClick={onClick}
            pScale={pScale}
            pTranslationX={pTranslationX}
            pTranslationY={pTranslationY}
          />
        </div>
      </div>
      <section
        style={{
          display: 'none',
        }}
      >
        <div>
          <input
            className="slider is-fullwidth is-large"
            style={{
              transform: 'rotate(180deg)',
            }}
            step="0.05"
            min="0"
            max="3"
            value={pTranslationX}
            type="range"
            onChange={(e) => {
              setPTranslationX(Number(e.target.value));
            }}
          />
          <input
            className="slider is-fullwidth is-large"
            style={{
              transform: 'rotate(-90deg)',
            }}
            step="0.05"
            min="0"
            max="3"
            value={pTranslationY}
            type="range"
            onChange={(e) => {
              setPTranslationY(Number(e.target.value));
            }}
          />
          <button className="button is-info is-rounded" onClick={() => setPScale((_scale) => _scale + 10)}>
            Zoom In
          </button>
          <button className="button is-info is-rounded" onClick={() => setPScale((_scale) => _scale - 10)}>
            Zoom Out
          </button>
        </div>
      </section>
    </>
  );
};

MainGlobalCase.propTypes = {};

export default MainGlobalCase;
