import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import GlobalMap from '../components/global/globalMap';
import MainGlobalCase from '../components/global/mainGlobalCase';
import { __api_host__, __api_host2__, __api_key__, __api_host3__ } from '../data/const';
import MainUsCase from '../components/usdomastic/mainUsCase';
import { MyHeader } from '../components/nav/myHeader';
import { HtmlHeader } from '../components/basic/htmlHeader';
import { stat } from 'fs';
import { getState, convertRegion } from '../components/helperLib/help';
import { StatisticDomasticCardDisplay } from '../components/statisticDisplay/StatisticDomasticCardDisplay';
import { StatisticDomasticLevelDisplay } from '../components/statisticDisplay/StatisticDomasticLevelDisplay';
import Loading from '../components/basic/Loading';
import { AutoComplete } from '../components/basic/AutoComplete';
import { StatisticTopGroup } from '../components/statisticDisplay/StatisticTopGroup';
import { Container } from '../components/bulmaComponents/Container';
import { motion } from 'framer-motion';
import { FixContainer } from '../components/bulmaComponents/FixContainer';

const TO_NAME = 1;
const TO_ABBREVIATED = 2;

const moment = require('moment');
const uniqid = require('uniqid');
const axios = require('axios');

const iso_countries = require('i18n-iso-countries');
iso_countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export default function Uscase() {
  const [stateList, setStateList] = useState([]);
  const [selectState, setSelectState] = useState({
    state: {
      name: '',
      code: '',
    },
    cases: {},
    death: {},
    active: {},
    recovered: {},
    fatalityRate: 0,
    cities: [],
    time: null,
    timediff: '',
  });

  const [currentGuestLocaltion, setCurrentGuestLocation] = useState({
    city: 'San Francisco',
    state: convertRegion('CA', TO_NAME),
  });

  const caseDisplayRef = useRef(null);

  const getTimeDiff = (time) => {
    // return moment().diff(moment(time), 'seconds').asMilliseconds().format('hh:mm:ss');
    var a = moment();
    var b = moment(time);
    var diff_s = a.diff(b, 'seconds');
    return moment.utc(moment.duration(diff_s, 'seconds').asMilliseconds()).format('hh:mm:ss');
  };

  // useEffect(() => {
  //   console.log(selectState);
  // }, [selectState]);

  // useEffect(() => {
  //   console.log(stateList);
  // }, [stateList]);

  // useEffect(() => {
  //   console.log(currentGuestLocaltion);
  // }, [currentGuestLocaltion]);

  // get localGeustLocation
  useEffect(() => {
    axios
      .get('https://www.iplocate.io/api/lookup/')
      .then((response) =>
        setCurrentGuestLocation({
          ...response.data,
          country_code: iso_countries.alpha2ToAlpha3(response.data.country_code),
          state: convertRegion(getState(response.data.postal_code), TO_NAME),
        })
      )
      .catch(console.error);
  }, []);

  const getDomasticStatistic = () => {
    return axios
      .get(`https://${__api_host3__}/reports`, {
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': __api_host3__,
          'x-rapidapi-key': __api_key__,
          useQueryString: true,
        },
        params: {
          iso: 'USA',
          region_name: 'US',
          // city_name: 'Autauga',
          // date: '2020-04-16',
          // q: 'US Alabama',
        },
      })
      .then((response: { data: { data: [] } }) => {
        return response.data.data
          .map((stateData: any) => ({
            id: stateData.region.province,
            value: stateData.confirmed,
            state: {
              name: stateData.region.province,
              code: convertRegion(stateData.region.province, TO_ABBREVIATED),
            },
            cases: {
              total: stateData.confirmed,
              new: stateData.confirmed_diff,
            },
            death: {
              total: stateData.deaths,
              new: stateData.deaths_diff,
            },
            active: {
              total: stateData.active,
              new: stateData.active_diff,
            },
            recovered: {
              total: stateData.recovered,
              new: stateData.recovered_diff,
            },
            fatalityRate: stateData.fatality_rate,
            cities: stateData.region.cities.map((el: {}) => ({ ...el, elId: uniqid() })),
            time: moment.utc(stateData.last_update).toDate(), //utc to local， moment(time).local().format('YYYY-MM-DD HH:mm:ss')
          }))
          .filter((s) => s.id !== 'Recovered')
          .map((el: {}) => ({ ...el, elId: uniqid() }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // react-query Queries
  const domasticQuery = useQuery('domastic', getDomasticStatistic, {
    onSuccess: (data: []) => {
      setStateList(data);
      if (data.length > 0) {
        updateSelect(
          data.filter(
            (s: { id: string }) =>
              s.id === (selectState.state.name ? selectState.state.name : currentGuestLocaltion.state)
          )[0]
        );
      }
    },
  });

  // react-query Mutations
  const [refreshDomastic] = useMutation(getDomasticStatistic, {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries('domastic');
    },
  });

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

  const handleMainDomasticCaseClick = (e) => {
    if (stateList.length > 0) {
      // console.log(e);
      if (e.data) {
        updateSelect(e.data);
      }
    }
  };

  const updateSelect = (select) => {
    const { state, cases, death, active, recovered, fatalityRate, cities, time } = select;
    setSelectState({
      state,
      cases,
      death,
      active,
      recovered,
      fatalityRate,
      cities,
      time: moment(time).format('lll'),
      timediff: `Updated ${getTimeDiff(time)} ago`,
    });
  };

  const handleMainDomasticCaseHover = (e) => {
    let myTooltip = document.createElement('div');
    // myTooltip.id = 'myToolTip';
    // myTooltip.innerHTML = '<h1>Hello, world</h1>';
    // return myTooltip;
    return null;
  };

  const handleRefreshButtonClick = () => {
    refreshDomastic();
  };

  // framer motion
  const mainVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 1,
      },
    },
  };

  const setContainerVariants = (index: number) => ({
    hidden: {
      // opacity: 0,
      x: '100vw',
    },
    visible: {
      // opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        delay: 0.3 * index,
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
        type: 'spring',
        mass: 0.4,
        damping: 8,
      },
    },
  };

  return (
    <motion.main variants={mainVariant} initial="hidden" animate="visible">
      <MyHeader />
      <Container variants={setContainerVariants(1)} isVisible={stateList.length > 0}>
        <StatisticTopGroup
          data={stateList
            .sort((a, b) => b.value - a.value)
            .map((state) => ({
              topValue: state.value,
              topId: state.id,
              topOnClick: () => updateSelect(state),
              ...state,
            }))}
          title={`confirmed cases states in US`}
          defaultTopNumber={5}
          colorPattern="YlOrRd"
        />
      </Container>

      <Container
        variants={setContainerVariants(2)}
        key={selectState.state.name}
        isVisible={selectState.cities.length > 0}
      >
        <StatisticTopGroup
          data={selectState.cities
            .sort((a, b) => b.confirmed - a.confirmed)
            .map((city) => ({
              topValue: city.confirmed,
              topId: city.name,
              topOnClick: () => {},
              ...city,
            }))}
          title={`confirmed cases cities in ${selectState.state.name}`}
          defaultTopNumber={7}
          colorPattern="PuRd"
        />
      </Container>
      {/* <div className="level">
        <div className="level-item">
          <AutoComplete
            name="city"
            label="City"
            placeholder="Choose a city"
            data={selectState.cities.map((c) => c.name)}
          />
        </div>
        <div className="level-item">
          <AutoComplete
            name="state"
            label="State"
            placeholder="Choose a state"
            data={stateList.map((s) => s.id)}
          />
        </div>
      </div> */}

      <section id="sticky-container">
        {stateList.length === 0 && (
          <>
            <Loading />
            {sticky && (
              <Loading
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 10,
                }}
              />
            )}
          </>
        )}

        <Container
          variants={setContainerVariants(3)}
          isVisible={typeof selectState.state.name === 'string' && stateList.length > 0}
        >
          <div
            ref={caseDisplayRef}
            onScroll={() => {
              const { offsetTop } = caseDisplayRef.current;
              console.log(offsetTop);
            }}
          >
            <StatisticDomasticLevelDisplay selectState={selectState} />
          </div>
        </Container>
        <FixContainer
          // onScroll={() => {
          //   const { offsetTop } = caseDisplayRef.current;
          //   console.log(offsetTop);
          // }}
          style={{ background: 'white' }}
          variants={stickyVariants}
          isVisible={sticky && stateList.length > 0}
        >
          <StatisticDomasticCardDisplay selectState={selectState} />
        </FixContainer>
      </section>
      <Container variants={setContainerVariants(4)} isVisible={stateList.length > 0}>
        <MainUsCase data={stateList} onHover={handleMainDomasticCaseHover} onClick={handleMainDomasticCaseClick} />
      </Container>
    </motion.main>
  );
}
