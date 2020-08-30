import React from 'react';

const d3 = require('d3-format');

interface StatisticDomasticCardDisplayProps {
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

export const StatisticDomasticCardDisplay: React.FC<StatisticDomasticCardDisplayProps> = ({ selectState }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img
              style={{
                marginTop: 15,
              }}
              src={`http://flags.ox3.in/svg/us/${selectState.state.code.toLowerCase()}.svg`}
              alt="Image"
            />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{selectState.state['name']}</strong> <small>{selectState.timediff}</small>
            </p>
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Fatality Rate</span>
                  <span className="tag is-light">{d3.format(',.2s')(selectState.fatalityRate)}</span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Cases</span>
                  <span className="tag is-warning">
                    {d3.format(',')(selectState.cases['total'])}
                    {selectState.cases['new'] ? `(+${d3.format(',')(selectState.cases['new'])})` : ''}
                  </span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Active</span>
                  <span className="tag is-info">
                    {d3.format(',')(selectState.active['total'])}
                    {selectState.active['new'] ? `(+${d3.format(',')(selectState.active['new'])})` : ''}
                  </span>
                </div>
              </div>

              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Death</span>
                  <span className="tag is-danger">
                    {d3.format(',')(selectState.death['total'])}
                    {selectState.death['new'] ? `(+${d3.format(',')(selectState.death['new'])})` : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="control">
                          <div className="tags has-addons">
                            <span className="tag is-dark">Recovered</span>
                            <span className="tag is-info">
                              {d3.format(',')(selectState.recovered['total'])}
                              {selectState.recovered['new'] ? `(+${d3.format(',')(selectState.recovered['new'])})` : ''}
                            </span>
                          </div>
                        </div> */}

            {/* <small>{selectCountry.state.code}</small>  */}
          </div>
        </div>
      </article>
    </div>
  );
};
