import React, { useState, useEffect, useRef } from 'react';
const d3 = require('d3-format');
const d3_c = require('d3-scale-chromatic');
// const uniqid = require('uniqid');

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
  const [selectedNameId, setSelectedNameId] = useState('');

  // useEffect(() => {
  //   console.log(selectedNameId);
  // }, [selectedNameId]);

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
          <div
            className="field is-grouped is-grouped-multiline"
            style={{
              maxHeight: 300,
              overflowX: 'auto',
            }}
          >
            {data
              .slice(0, displayAmount)
              // .map((el) => ({ ...el, elId: uniqid() }))
              .map((el, index) => (
                <p key={el.elId} className="control">
                  <a
                    // className={`button ${index === 0 ? 'is-danger' : index === 1 ? 'is-warning' : ''}`}
                    className={`button topButton-${el.elId}`}
                    style={{
                      border: `${getD3Color(0.9 - (index / data.length) * 0.9)} 4px solid`,
                      background:
                        index <= 2 || selectedNameId.indexOf(el.topId) === 0
                          ? getD3Color(0.9 - (index / data.length) * 0.9)
                          : undefined,
                      color: index <= 2 || selectedNameId.indexOf(el.topId) === 0 ? 'white' : undefined,
                      opacity: selectedNameId.indexOf(el.topId) === 0 ? 0.6 : 1,
                      transition: '0.2s all',
                    }}
                    onClick={(e) => {
                      el.topOnClick(e);
                      setSelectedNameId(el.topId);
                    }}
                    // onMouseOver={(e) => {
                    //   let element = document.querySelector(`.button.topButton-${el.elId}`);
                    //   element.classList.add('hovered');
                    // }}
                    // onMouseLeave={(e) => {
                    //   let element = document.querySelector(`.button.topButton-${el.elId}`);
                    //   element.classList.remove('hovered');
                    // }}
                  >
                    <b>{el.topId}</b>&nbsp;
                    {`(${d3.format(',')(el.topValue)})`}
                  </a>
                  <style>{`.button.topButton-${el.elId}:hover{background:${getD3Color(
                    0.9 - (index / data.length) * 0.9
                  )} !important;color: white;}`}</style>
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
