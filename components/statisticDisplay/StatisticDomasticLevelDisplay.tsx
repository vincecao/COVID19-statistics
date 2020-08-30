import React from 'react';

const d3 = require('d3-format');

interface StatisticDomasticLevelDisplayProps {
  selectState: {
    state: { name: string; code: string };
    cases: {};
    death: {};
    active: {};
    recovered: {};
    fatalityRate: number;
    cities: any;
    time: any;
    timediff: string;
  };
}

export const StatisticDomasticLevelDisplay: React.FC<StatisticDomasticLevelDisplayProps> = ({ selectState }) => {
  return (
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Select Country</p>
          <h1 className="title is-spaced">{selectState.state['name']}</h1>
          <h2 className="subtitle is-6">
            <i>{selectState.timediff}</i>
          </h2>
        </div>
      </div>

      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Fatality Rate</p>
          <h1 className="title is-spaced">{d3.format(',')(selectState.fatalityRate)}</h1>
        </div>
      </div>

      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Cases</p>
          <h1 className="title is-spaced">{d3.format(',')(selectState.cases['total'])}</h1>
          {selectState.cases['new'] && <h2 className="subtitle">{`(+${d3.format(',')(selectState.cases['new'])})`}</h2>}
        </div>
      </div>

      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Active</p>
          <h1 className="title is-spaced">{d3.format(',')(selectState.active['total'])}</h1>
          {selectState.active['new'] && (
            <h2 className="subtitle">{`(+${d3.format(',')(selectState.active['new'])})`}</h2>
          )}
        </div>
      </div>

      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Death</p>
          <h1 className="title is-spaced">{d3.format(',')(selectState.death['total'])}</h1>
          {selectState.death['new'] && <h2 className="subtitle">{`(+${d3.format(',')(selectState.death['new'])})`}</h2>}
        </div>
      </div>
      {/* <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Recovered</p>
                    <h1 className="title is-spaced">{d3.format(',.2s')(selectState.recovered['total'])}</h1>
                    {selectState.recovered['new'] && (
                      <h2 className="subtitle">{`(+${d3.format(',')(selectState.recovered['new'])})`}</h2>
                    )}
                  </div>
                </div> */}
    </nav>
  );
};
