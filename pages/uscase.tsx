import { useState, useEffect, useRef } from 'react';
import GlobalMap from '../components/globalMap';
import MainGlobalCase from '../components/mainGlobalCase';
import { __api_host__, __api_host2__, __api_key__, __api_host3__ } from '../data/const';
import MainUsCase from '../components/mainUsCase';
import { MyHeader } from '../components/nav/myHeader';
import { HtmlHeader } from '../components/basic/htmlHeader';

const moment = require('moment');

const axios = require('axios');
const d3 = require('d3-format');

export default function Uscase() {
  const [stateList, setStateList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [selectState, setSelectState] = useState({
    country: {},
    cases: {},
    death: {},
    tests: {},
    population: '',
    time: null,
    timediff: '',
  });

  const caseDisplayRef = useRef(null);

  useEffect(() => {
    console.log(selectState);
  }, [selectState]);

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `https://${__api_host3__}/provinces`,
  //     headers: {
  //       'content-type': 'application/octet-stream',
  //       'x-rapidapi-host': __api_host3__,
  //       'x-rapidapi-key': __api_key__,
  //       useQueryString: true,
  //     },
  //     params: {
  //       iso: 'USA',
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       setStateList(response.data.filter((data) => data.province.indexOf(',') === -1))
  //       setProvinceList(response.data.filter((data) => data.province.indexOf(',') !== -1))
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    let stickyContainer = document.getElementById('sticky-container');
    if (stickyContainer) {
      let viewportOffset = stickyContainer.getBoundingClientRect();
      let top = viewportOffset.top;
      if (top >= 10) {
        setSticky(false);
      } else {
        setSticky(true);
      }
    }
  };

  return (
    <main>
      <MyHeader />
      <section id="sticky-container">
        {stateList.length === 0 && (
          <>
            <progress className="progress is-small is-warning" max="100">
              15%
            </progress>
            {sticky && (
              <progress
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 10,
                }}
                className="progress is-small is-warning"
                max="100"
              >
                15%
              </progress>
            )}
          </>
        )}
        {stateList.length > 0 && (
          <>
            <div
              className="mt-5 mb-5"
              ref={caseDisplayRef}
              onScroll={() => {
                const { offsetTop } = caseDisplayRef.current;
                console.log(offsetTop);
              }}
            >
              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Select Country</p>
                    <h1 className="title is-spaced">{selectState.country['name']}</h1>
                    <h2 className="subtitle is-6">
                      <i>{selectState.timediff}</i>
                    </h2>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Population</p>
                    <h1 className="title is-spaced">{d3.format(',.2s')(selectState.population)}</h1>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Tests</p>
                    <h1 className="title is-spaced">{d3.format(',')(selectState.tests['total'])}</h1>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Cases</p>
                    <h1 className="title is-spaced">{d3.format(',')(selectState.cases['total'])}</h1>
                    {selectState.cases['new'] && (
                      <h2 className="subtitle">{`(+${d3.format(',')(selectState.cases['new'])})`}</h2>
                    )}
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Death</p>
                    <h1 className="title is-spaced">{d3.format(',')(selectState.death['total'])}</h1>
                    {selectState.death['new'] && (
                      <h2 className="subtitle">{`(+${d3.format(',')(selectState.death['new'])})`}</h2>
                    )}
                  </div>
                </div>
              </nav>
            </div>
            {sticky && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  background: 'white',
                  zIndex: 10,
                }}
                onScroll={() => {
                  const { offsetTop } = caseDisplayRef.current;
                  console.log(offsetTop);
                }}
              >
                <div className="box">
                  <article className="media">
                    <div className="media-left">
                      <figure className="image is-64x64">
                        <img
                          src={`https://www.countryflags.io/${selectState.country['code-2']}/shiny/64.png`}
                          alt="Image"
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>{selectState.country['name']}</strong> <small>{selectState.timediff}</small>
                        </p>
                        <div className="field is-grouped is-grouped-multiline">
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-dark">Population</span>
                              <span className="tag is-light">{d3.format(',.2s')(selectState.population)}</span>
                            </div>
                          </div>

                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-dark">Tests</span>
                              <span className="tag is-info">{d3.format(',')(selectState.tests['total'])}</span>
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
                              <span className="tag is-dark">Death</span>
                              <span className="tag is-danger">
                                {d3.format(',')(selectState.death['total'])}
                                {selectState.death['new'] ? `(+${d3.format(',')(selectState.death['new'])})` : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <small>{selectCountry.country['code-3']}</small>  */}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      <div className="level mt-3">
        <div className="level-item has-text-centered">
          <p className="heading">Developing...</p>
        </div>
      </div>
      {/* <section>
          <MainGlobalCase
            data={countriesList}
            onHover={function (e) {
              let myTooltip = document.createElement('div');
              // myTooltip.id = 'myToolTip';
              // myTooltip.innerHTML = '<h1>Hello, world</h1>';
              // return myTooltip;
              return null;
            }}
            onClick={(e) => {
              if (countriesList.length > 0) {
                // console.log(e);
                if (e.data) {
                  const { country, cases, death, tests, population, time } = e.data;
                  setSelectCountry({
                    country,
                    cases,
                    death,
                    tests,
                    population,
                    time: moment(time).format('lll'),
                    timediff: `Updated ${moment().diff(moment(time), 'minutes')} minutes ago`, //moment.duration(moment(time).diff(new moment())).asMinutes(),
                  });
                }
              }
            }}
          />
        </section> */}
      <section style={{ opacity: 0.6 }}>
        <MainUsCase data={[]} onClick={() => {}} onHover={() => {}} />
      </section>
    </main>
  );
}
