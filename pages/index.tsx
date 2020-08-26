import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import GlobalMap from '../components/globalMap';
import MainGlobalCase from '../components/mainGlobalCase';
import { __api_host__, __api_host2__, __api_key__ } from '../data/const';

const axios = require('axios');
const d3 = require('d3-format');

export default function Home() {
  const [countriesList, setCountriesList] = useState([]);
  const [selectCountry, setSelectCountry] = useState({
    country: {},
    cases: {},
    death: {},
    tests: {},
    population: '',
  });

  const caseDisplayRef = useRef(null);

  useEffect(() => {
    /*
      {
        "name": "Afghanistan",
        "alpha2code": "AF",
        "alpha3code": "AFG",
        "latitude": 33.93911,
        "longitude": 67.709953
    }
    */
    axios
      .get(`https://${__api_host__}/help/countries`, {
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': __api_host__,
          'x-rapidapi-key': __api_key__,
          useQueryString: true,
        },
        params: {
          format: 'json',
        },
      })
      .then((response) => {
        let countryMap = {};
        response.data.map((country) => {
          countryMap = {
            ...countryMap,
            [country.name]: {
              'code-3': country.alpha3code,
              'code-2': country.alpha2code,
            },
          };
          return null;
        });
        console.log({ countryMap });
        return countryMap;
      })
      .then(
        (countryMap) =>
          new Promise((resolve, reject) =>
            axios
              .get(`https://${__api_host2__}/statistics`, {
                headers: {
                  'content-type': 'application/octet-stream',
                  'x-rapidapi-host': __api_host2__,
                  'x-rapidapi-key': __api_key__,
                  useQueryString: true,
                },
              })
              .then((response) => {
                resolve(
                  response.data.response.map((statistic) => {
                    if (countryMap[statistic.country]) {
                      return {
                        name: statistic.country,
                        id: countryMap[statistic.country]['code-3'],
                        country: {
                          name: statistic.country,
                          'code-3': countryMap[statistic.country]['code-3'],
                          'code-2': countryMap[statistic.country]['code-2'],
                        },
                        value: statistic.cases.total,
                        cases: statistic.cases,
                        death: statistic.deaths,
                        tests: statistic.tests,
                        population: statistic.population,
                      };
                    }
                    return {
                      name: statistic.country,
                    };
                  })
                );
              })
              .catch(reject)
          )
      )
      .then(setCountriesList)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (countriesList.length > 0) {
      const _us = countriesList.filter((c) => c.name === 'USA')[0];
      setSelectCountry({
        country: _us.country,
        cases: _us.cases,
        death: _us.death,
        tests: _us.tests,
        population: _us.population,
      });
    }
  }, [countriesList]);

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

  const MyHeader = () => (
    <section className="hero is-warning is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Covid 19 Statistics</h1>
          <h2 className="subtitle">A simple webpage display covid-19 latest statistics data</h2>
        </div>
      </div>
    </section>
  );

  return (
    <div className="root">
      <Head>
        <title>COVID19 | Statistics</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      </Head>

      <main>
        <MyHeader />
        <section id="sticky-container">
          {countriesList.length === 0 && (
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
          {countriesList.length > 0 && (
            <>
              <div
                className="mt-5"
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
                      <h1 className="title is-spaced">{selectCountry.country['name']}</h1>
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
                            src={`https://www.countryflags.io/${selectCountry.country['code-2']}/shiny/64.png`}
                            alt="Image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>{selectCountry.country['name']}</strong>{' '}
                            <small>{selectCountry.country['code-3']}</small> <small>31m</small>
                            <br />
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
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
        <section>
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
                  setSelectCountry({
                    country: e.data.country,
                    cases: e.data.cases,
                    death: e.data.death,
                    tests: e.data.tests,
                    population: e.data.population,
                  });
                }
              }
            }}
          />
        </section>
      </main>

      <footer></footer>
    </div>
  );
}
