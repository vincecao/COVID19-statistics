import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UsMap from './usMap';

const MainUsCase = ({ data, onHover, onClick }) => {
  const [pTranslationX, setPTranslationX] = useState(1.8);
  const [pTranslationY, setPTranslationY] = useState(1.35);
  const [pScale, setPScale] = useState(970);

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
      <div
        style={{
          overflowY: 'hidden',
          overflowX: 'auto',
        }}
      >
        <UsMap
          projectionScale={500}
          data={data}
          onHover={onHover}
          onClick={onClick}
          pScale={pScale}
          pTranslationX={pTranslationX}
          pTranslationY={pTranslationY}
        />
      </div>
      {false && ( // debug use to adjust map
        <section>
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
      )}
    </>
  );
};

MainUsCase.propTypes = {};

export default MainUsCase;
