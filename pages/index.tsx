import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import MainGlobalCase from '../components/global/mainGlobalCase';
import { __api_host__, __api_host2__, __api_key__, __api_host3__ } from '../data/const';
import { StatisticGlobalCardDisplay } from '../components/statisticDisplay/StatisticGlobalCardDisplay';
import { StatisticGlobalLevelDisplay } from '../components/statisticDisplay/StatisticGlobalLevelDisplay';
import Loading from '../components/basic/Loading';
import { StatisticTopGroup } from '../components/statisticDisplay/StatisticTopGroup';
import { StatisticPieGraph } from '../components/statisticDisplay/StatisticPieGraph';
import { Container } from '../components/bulmaComponents/Container';
import { StatisticStreamGraph } from '../components/statisticDisplay/StatisticStreamGraph';
import { motion, AnimatePresence } from 'framer-motion';
import { FixContainer } from '../components/bulmaComponents/FixContainer';

const moment = require('moment');
const uniqid = require('uniqid');
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
  cases: {
    total: number;
  };
  death: {
    total: number;
  };
  tests: {
    total: number;
  };
  population: string;
  time: any;
  timediff: string;
}

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectCountry, setSelectCountry] = useState({
    country: {
      name: '',
      'code-3': '',
      'code-2': '',
    },
    cases: {
      total: 0,
    },
    death: {
      total: 0,
    },
    tests: {
      total: 0,
    },
    population: '',
    time: null,
    timediff: '',
  });
  const [currentGuestLocaltion, setCurrentGuestLocation] = useState({
    country_code: 'USA',
    city: '',
  });
  // const [syncing, setSyncing] = useState(false);

  const [provinceStreamData, setProvinceStreamData] = useState([]);

  const caseDisplayRef = useRef(null);

  // useEffect(() => {
  //   console.log({ currentGuestLocaltion });
  // }, [currentGuestLocaltion]);

  // useEffect(() => {
  //   console.log({ selectCountry });
  // }, [selectCountry]);

  // useEffect(() => {
  //   console.log(provinceStreamData);
  // }, [provinceStreamData]);

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
                  response.data.response
                    .map((statistic) => {
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
                    .map((el: {}) => ({ ...el, elId: uniqid() }))
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
        updateSelect(
          data.filter(
            (c: { id: string }) =>
              c.id ===
              (selectCountry.country['code-3'] ? selectCountry.country['code-3'] : currentGuestLocaltion.country_code)
          )[0]
        );
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

  const getTimeDiff = (time) => {
    return moment().diff(moment(time), 'minutes');
  };

  const handleMainGlobalCaseClick = (e) => {
    if (countriesList.length > 0) {
      // console.log(e);
      if (e.data) {
        updateSelect(e.data);
      }
    }
  };

  const updateSelect = (select) => {
    const { country, cases, death, tests, population, time } = select;
    setSelectCountry({
      country,
      cases,
      death,
      tests,
      population,
      time: moment(time).format('lll'),
      timediff: `Updated ${getTimeDiff(time)} minutes ago`, //moment.duration(moment(time).diff(new moment())).asMinutes(),
    });
  };

  const getDailyConfirmedCasesWithProvince = async (index, country) =>
    await axios
      .get(`https://${__api_host3__}/reports`, {
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': __api_host3__,
          'x-rapidapi-key': __api_key__,
          useQueryString: true,
        },
        params: {
          iso: country['code-3'],
          date: moment().subtract(index, 'days').format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        /*
        {
          "date": "2020-09-03",
          "confirmed": 991,
          "deaths": 6,
          "recovered": 985,
          "confirmed_diff": 0,
          "deaths_diff": 0,
          "recovered_diff": 0,
          "last_update": "2020-09-04 04:28:26",
          "active": 0,
          "active_diff": 0,
          "fatality_rate": 0.0061,
          "region": {
              "iso": "CHN",
              "name": "China",
              "province": "Anhui",
              "lat": "31.8257",
              "long": "117.2264",
              "cities": []
          }
      },
      */
        const reducer = (acc, cur) => ({
          ...acc,
          [cur.province]: cur.confirmed,
        });
        return response.data.data
          .sort((a, b) => b.confirmed - a.confirmed)
          .slice(0, 6)
          .map((p) => ({
            province: p.region.province,
            confirmed: p.confirmed,
          }))
          .reduce(reducer, {});
      })
      .then((newProvinceStreamData = {}) => {
        console.log(newProvinceStreamData);
        return newProvinceStreamData;
      })
      .catch((err) => {
        console.error(err);
        return {};
      });

  useEffect(() => {
    if (selectCountry && selectCountry.country && selectCountry.country['code-3']) {
      const { country } = selectCountry;

      let tempProviceData = [];
      for (let index = 0; index < 8; index++) {
        getDailyConfirmedCasesWithProvince(index, country).then((object) => {
          if (Object.keys(object).length > 0) {
            tempProviceData.push(object);
          }
        });
      }
      setProvinceStreamData(tempProviceData);
    }

    return () => setProvinceStreamData([]);
  }, [selectCountry.country.name]);

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

  // framer motion
  const mainVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        // ease: 'easeInOut',
        // duration: 0.7,
      },
    },
  };

  const setContainerVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      x: '100vw',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        delay: 0.2 * index,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        ease: 'easeInOut',
      },
    },
  });

  const stickyVariants = {
    hidden: {
      y: '-50vh',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
      },
    },
    exit: {
      y: '-50vh',
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.main variants={mainVariants} initial="hidden" animate="visible" exit="exit">
      {globalQuery.isFetching && <Loading />}
      <Container variants={setContainerVariants(1)} isVisible={countriesList.length > 0}>
        <StatisticTopGroup
          data={countriesList
            .sort((a, b) => b.value - a.value)
            .map((country) => ({
              topValue: country.value,
              topId: country.name,
              topOnClick: () => updateSelect(country),
              ...country,
            }))}
          title={`confirmed cases countries in global`}
          defaultTopNumber={10}
          colorPattern="GnBu"
          selectedNameId={selectCountry.country.name}
        />
      </Container>

      <section id="sticky-container">
        <Container
          animatekey={`level-data-${selectCountry.country.name}`}
          variants={setContainerVariants(3)}
          isVisible={typeof selectCountry.country.name === 'string' && countriesList.length > 0}
        >
          <div
            ref={caseDisplayRef}
            onScroll={() => {
              const { offsetTop } = caseDisplayRef.current;
              console.log(offsetTop);
            }}
          >
            <StatisticGlobalLevelDisplay selectCountry={selectCountry} />
          </div>
        </Container>

        <FixContainer
          // onScroll={() => {
          //   const { offsetTop } = caseDisplayRef.current;
          //   console.log(offsetTop);
          // }}
          style={{ background: 'white' }}
          variants={stickyVariants}
          isVisible={sticky && countriesList.length > 0}
        >
          <StatisticGlobalCardDisplay
            selectCountry={selectCountry}
            onRefresh={handleRefreshButtonClick}
            syncing={globalQuery.isFetching}
          />
        </FixContainer>

        <FixContainer
          style={{ background: 'none', zIndex: 11 }}
          variants={stickyVariants}
          isVisible={sticky && globalQuery.isFetching}
        >
          <Loading />
        </FixContainer>

        <Container
          animatekey={`graph-data-${selectCountry.country.name}`}
          variants={setContainerVariants(4)}
          isVisible={countriesList.length > 0}
        >
          <div className="columns">
            <div
              className="column"
              style={{
                maxWidth: provinceStreamData.length > 0 ? 400 : '100%',
                transition: 'all 0.4s',
              }}
            >
              <StatisticPieGraph
                pieData={{
                  data: [
                    {
                      id: 'cases',
                      label: 'cases',
                      value: selectCountry.cases.total,
                      color: 'hsl(178, 70%, 50%)',
                    },
                    {
                      id: 'deaths',
                      label: 'deaths',
                      value: selectCountry.death.total,
                      color: 'hsl(197, 70%, 50%)',
                    },
                    // {
                    //   id: 'tests',
                    //   label: 'tests',
                    //   value: selectCountry.tests.total,
                    //   color: 'hsl(163, 70%, 50%)',
                    // },
                  ],
                }}
              />
            </div>
            {provinceStreamData.length > 0 && (
              <AnimatePresence>
                <motion.div
                  variants={setContainerVariants(4)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="column"
                >
                  <StatisticStreamGraph
                    streamData={{
                      data: provinceStreamData,
                      key: Object.keys(provinceStreamData[0]),
                      horiTag: `Top 6 confirmed cases with states/provinces of ${selectCountry.country.name} in past n days`,
                    }}
                    colorScheme="purple_orange"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </Container>
      </section>

      <Container variants={setContainerVariants(5)} isVisible={countriesList.length > 0}>
        <MainGlobalCase data={countriesList} onHover={handleMainGlobalCaseHover} onClick={handleMainGlobalCaseClick} />
      </Container>
    </motion.main>
  );
};

Home.getInitialProps = ({}) => {
  return {};
};

export default Home;
