import React, { useState, useEffect, useRef } from 'react';
const d3 = require('d3-format');
const d3_c = require('d3-scale-chromatic');
const uniqid = require('uniqid');

interface StatisticTopGroupProps {
  title: string;
  data: any;
  defaultTopNumber: number;
  colorPattern: string;
}

export const StatisticTopGroup: React.FC<StatisticTopGroupProps> = ({
  title,
  data,
  defaultTopNumber,
  colorPattern,
}) => {
  const [displayAmount, setDisplayAmount] = useState(defaultTopNumber);

  const handleOnExpand = () => {
    if (displayAmount + 5 >= data.length) {
      setDisplayAmount(data.length);
    } else {
      setDisplayAmount(displayAmount + 5);
    }
  };

  const handleOnCollapse = () => {
    setDisplayAmount(defaultTopNumber);
  };

  const getD3Color = (t) => {
    return colorPattern === 'YlOrRd'
      ? d3_c.interpolateYlOrRd(t)
      : colorPattern === 'PuRd'
      ? d3_c.interpolatePuRd(t)
      : colorPattern === 'GnBu'
      ? d3_c.interpolateGnBu(t)
      : 'white';
  };

  return data && data.length > 0 ? (
    <div className="section">
      <div className="container">
        <div className="row">
          <h4 className="title is-4">
            Top {displayAmount} {title}
          </h4>
          <div className="field is-grouped is-grouped-multiline">
            {data
              .slice(0, displayAmount)
              .map((el) => ({ ...el, elId: uniqid() }))
              .map((el, index) => (
                <p key={el.elId} className="control">
                  <a
                    // className={`button ${index === 0 ? 'is-danger' : index === 1 ? 'is-warning' : ''}`}
                    className={`button`}
                    style={{
                      border: `${getD3Color(0.9 - (index / data.length) * 0.9)} 4px solid`,
                      background: index <= 2 ? getD3Color(0.9 - (index / data.length) * 0.9) : undefined,
                      color: index <= 2 ? 'white' : undefined,
                    }}
                    onClick={el.topOnClick}
                  >{`${el.topId} (${d3.format(',')(el.topValue)})`}</a>
                </p>
              ))}
            {displayAmount !== data.length && (
              <p className="control">
                <a className={`button`} onClick={handleOnExpand}>
                  ...
                </a>
              </p>
            )}
            {displayAmount === data.length && (
              <p className="control">
                <a className={`button`} onClick={handleOnCollapse}>
                  Collapse
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
