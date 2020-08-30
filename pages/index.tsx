import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import GlobalMap from '../components/global/globalMap';
import MainGlobalCase from '../components/global/mainGlobalCase';
import { __api_host__, __api_host2__, __api_key__ } from '../data/const';
import MainUsCase from '../components/usdomastic/mainUsCase';
import { MyHeader } from '../components/nav/myHeader';
import { StatisticCardDisplay } from '../components/statisticDisplay/StatisticCardDisplay';
import { StatisticLevelDisplay } from '../components/statisticDisplay/StatisticLevelDisplay';

const moment = require('moment');

const axios = require('axios');

const COUNTRY_LIST = require('../data/country_list.json');

const iso_countries = require('i18n-iso-countries');
iso_countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

interface countriesListType {
  country: {
    name: string;
    'code-3': string;
    'code-2': string;
  };
  cases: {};
  death: {};
  tests: {};
  population: string;
  time: any;
  timediff: string;
}

export default function Home() {
  const [countriesList, setCountriesList] = useState([]);
  const [selectCountry, setSelectCountry] = useState({
    country: {
      name: '',
      'code-3': '',
      'code-2': '',
    },
    cases: {},
    death: {},
    tests: {},
    population: '',
    time: null,
    timediff: '',
  });
  const [currentGuestLocaltion, setCurrentGuestLocation] = useState({
    country_code: 'USA',
    city: '',
  });
  // const [syncing, setSyncing] = useState(false);

  const caseDisplayRef = useRef(null);

  // useEffect(() => {
  //   console.log({ currentGuestLocaltion });
  // }, [currentGuestLocaltion]);

  // useEffect(() => {
  //   console.log({ selectCountry });
  // }, [selectCountry]);

  // get localGeustLocation
  useEffect(() => {
    axios
      .get('https://www.iplocate.io/api/lookup/')
      .then((response) =>
        setCurrentGuestLocation({
          ...response.data,
          country_code: iso_countries.alpha2ToAlpha3(response.data.country_code),
        })
      )
      .catch(console.error);
  }, []);

  const getGlobalStatistic = () => {
    /*
      {
        "name": "Afghanistan",
        "alpha2code": "AF",
        "alpha3code": "AFG",
        "latitude": 33.93911,
        "longitude": 67.709953
    }
    */
    // axios
    //   .get(`https://${__api_host__}/help/countries`, {
    //     headers: {
    //       'content-type': 'application/octet-stream',
    //       'x-rapidapi-host': __api_host__,
    //       'x-rapidapi-key': __api_key__,
    //       useQueryString: true,
    //     },
    //     params: {
    //       format: 'json',
    //     },
    //   })
    return Promise.resolve()
      .then(() => {
        let countryMap = {};
        // response.data.map((country) => {
        COUNTRY_LIST.map((country) => {
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
                        time: statistic.time,
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
      .then((data: []) => {
        setCountriesList(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // react-query Queries
  const globalQuery = useQuery('global', getGlobalStatistic, {
    onSuccess: (data: []) => {
      setCountriesList(data);
      if (data.length > 0) {
        const new_country = data.filter(
          (c: { id: string }) =>
            c.id ===
            (selectCountry.country['code-3'] ? selectCountry.country['code-3'] : currentGuestLocaltion.country_code)
        )[0];
        const { country, cases, death, tests, population, time } = new_country;
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
    },
  });

  // react-query Mutations
  const [refreshGlobal] = useMutation(getGlobalStatistic, {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries('global');
    },
  });

  // scroll events
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

  const handleMainGlobalCaseClick = (e) => {
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
  };

  const handleMainGlobalCaseHover = (e) => {
    let myTooltip = document.createElement('div');
    // myTooltip.id = 'myToolTip';
    // myTooltip.innerHTML = '<h1>Hello, world</h1>';
    // return myTooltip;
    return null;
  };

  const handleRefreshButtonClick = () => {
    refreshGlobal();
  };

  return (
    <main>
      <MyHeader />
      <section id="sticky-container">
        {globalQuery.status === 'loading' && (
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
              className="mt-5 mb-5 container"
              ref={caseDisplayRef}
              onScroll={() => {
                const { offsetTop } = caseDisplayRef.current;
                console.log({ caseDisplayRef: offsetTop });
              }}
            >
              <StatisticLevelDisplay selectCountry={selectCountry} />
              {/* <button className="button is-warning" onClick={handleRefreshButtonClick}>
                Refresh
              </button> */}
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
              >
                <StatisticCardDisplay
                  selectCountry={selectCountry}
                  onRefresh={handleRefreshButtonClick}
                  syncing={globalQuery.status === 'loading'}
                />
              </div>
            )}
          </>
        )}
      </section>
      <section>
        <MainGlobalCase data={countriesList} onHover={handleMainGlobalCaseHover} onClick={handleMainGlobalCaseClick} />
      </section>
      {/* <section>
        {globalQuery.data.map((country) => (
          <p></p>
        ))}
      </section> */}
      {/* <section>
          <MainUsCase data={[]} onClick={() => {}} onHover={() => {}} scale={1070} yValue={1.9} xValue={1.25} />
        </section> */}
    </main>
  );
}
