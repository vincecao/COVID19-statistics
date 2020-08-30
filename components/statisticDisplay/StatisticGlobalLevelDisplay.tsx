import React from 'react';

const d3 = require('d3-format');

interface StatisticGlobalLevelDisplayProps {
  selectCountry: {
    country: {};
    cases: {};
    death: {};
    tests: {};
    population: string;
    time: any;
    timediff: string;
  };
}

export const StatisticGlobalLevelDisplay: React.FC<StatisticGlobalLevelDisplayProps> = ({ selectCountry }) => {
  return (
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Select Country</p>
          <h1 className="title is-spaced">{selectCountry.country['name']}</h1>
          <h6 className="subtitle is-6">
            <i>{selectCountry.timediff}</i>
          </h6>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Population</p>
          <h1 className="title is-spaced">{d3.format(',.2s')(selectCountry.population)}</h1>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Tests</p>
          <h1 className="title is-spaced">{d3.format(',')(selectCountry.tests['total'])}</h1>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Cases</p>
          <h1 className="title is-spaced">{d3.format(',')(selectCountry.cases['total'])}</h1>
          {selectCountry.cases['new'] && (
            <h2 className="subtitle">{`(+${d3.format(',')(selectCountry.cases['new'])})`}</h2>
          )}
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Death</p>
          <h1 className="title is-spaced">{d3.format(',')(selectCountry.death['total'])}</h1>
          {selectCountry.death['new'] && (
            <h2 className="subtitle">{`(+${d3.format(',')(selectCountry.death['new'])})`}</h2>
          )}
        </div>
      </div>
    </nav>
  );
};
