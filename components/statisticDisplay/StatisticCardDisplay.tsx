import React from 'react';

const d3 = require('d3-format');

interface StatisticCardDisplayProps {
  selectCountry: {
    country: {};
    cases: {};
    death: {};
    tests: {};
    population: string;
    time: any;
    timediff: string;
  };
  syncing: boolean;
  onRefresh: any;
}

export const StatisticCardDisplay: React.FC<StatisticCardDisplayProps> = ({ selectCountry, onRefresh, syncing }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={`https://www.countryflags.io/${selectCountry.country['code-2']}/shiny/64.png`} alt="Image" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{selectCountry.country['name']}</strong> <small>{selectCountry.timediff}</small>
            </p>
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Population</span>
                  <span className="tag is-light">{d3.format(',.2s')(selectCountry.population)}</span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Tests</span>
                  <span className="tag is-info">{d3.format(',')(selectCountry.tests['total'])}</span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Cases</span>
                  <span className="tag is-warning">
                    {d3.format(',')(selectCountry.cases['total'])}
                    {selectCountry.cases['new'] ? `(+${d3.format(',')(selectCountry.cases['new'])})` : ''}
                  </span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Death</span>
                  <span className="tag is-danger">
                    {d3.format(',')(selectCountry.death['total'])}
                    {selectCountry.death['new'] ? `(+${d3.format(',')(selectCountry.death['new'])})` : ''}
                  </span>
                </div>
              </div>
            </div>
            {/* <small>{selectCountry.country['code-3']}</small>  */}
          </div>
          {/* <nav className="level is-mobile">
            <div className="level-left">
              <button className="level-item button" aria-label="refresh" onClick={onRefresh}>
                <span className="icon is-small">
                  <i className={`fas fa-sync-alt ${syncing ? 'fa-spin' : ''}`} aria-hidden="true"></i>
                </span>
              </button>
            </div>
          </nav> */}
        </div>
      </article>
    </div>
  );
};
