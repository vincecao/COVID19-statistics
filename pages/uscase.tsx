import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import { motion } from 'framer-motion';
import moment from 'moment';
import * as uniqid from 'uniqid';
import * as iso_countries from 'i18n-iso-countries';
import MainUsCase from '@components/pages-comp/usdomestic/mainUsCase';
import StatisticDomesticCardDisplay from '@components/statisticDisplay/StatisticDomesticCardDisplay';
import StatisticDomesticLevelDisplay from '@components/statisticDisplay/StatisticDomesticLevelDisplay';
import Loading from '@components/basic/Loading';
import { StatisticTopGroup } from '@components/statisticDisplay/StatisticTopGroup';
import { Container } from '@components/bulmaComponents/Container';
import { FixContainer } from '@components/bulmaComponents/FixContainer';
import { getLocationPromise, getReportPromise } from '@services/main';
import { convertRegion, getState } from '@utils/main';
import { containerVariants, mainVariants, stickyVariants } from '@variants/data';

const TO_NAME = 1;
const TO_ABBREVIATED = 2;

iso_countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Uscase = () => {
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
    getLocationPromise()
      .then((data) =>
        setCurrentGuestLocation({
          ...data,
          country_code: iso_countries.alpha2ToAlpha3(data.country_code),
          state: convertRegion(getState(data.postal_code), TO_NAME),
        })
      )
      .catch(console.error);
  }, []);

  const getDomesticStatistic = () => {
    return getReportPromise({
      iso: 'USA',
      region_name: 'US',
    })
      .then((data) => {
        return data
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
  const domesticQuery = useQuery('domestic', getDomesticStatistic, {
    onSuccess: (data = []) => {
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
  const [refreshDomestic] = useMutation(getDomesticStatistic, {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries('domestic');
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

  const handleMainDomesticCaseClick = (e) => {
    if (stateList.length > 0) {
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

  const handleMainDomesticCaseHover = (e) => {
    return null;
  };

  const handleRefreshButtonClick = () => {
    refreshDomestic();
  };

  const [selectCityName, setSelectCityName] = useState('-1');

  return (
    <motion.main variants={mainVariants} initial="hidden" animate="visible" exit="exit">
      {domesticQuery.isFetching && <Loading />}
      <Container variants={containerVariants(1)} isVisible={stateList.length > 0}>
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
          selectedNameId={selectState.state.name}
        />
      </Container>

      <Container
        variants={containerVariants(2)}
        animatekey={`top-data-${selectState.state.name}`}
        isVisible={selectState.cities.length > 0}
      >
        <StatisticTopGroup
          data={selectState.cities
            .sort((a, b) => b.confirmed - a.confirmed)
            .map((city) => ({
              topValue: city.confirmed,
              topId: city.name,
              topOnClick: (topId) => setSelectCityName(topId),
              ...city,
            }))}
          title={`confirmed cases cities in ${selectState.state.name}`}
          defaultTopNumber={7}
          colorPattern="PuRd"
          selectedNameId={selectCityName}
        />
      </Container>

      <section id="sticky-container">
        <Container
          animatekey={`level-data-${selectState.state.name}`}
          variants={containerVariants(3)}
          isVisible={typeof selectState.state.name === 'string' && stateList.length > 0}
        >
          <div
            ref={caseDisplayRef}
            onScroll={() => {
              const { offsetTop } = caseDisplayRef.current;
              console.log(offsetTop);
            }}
          >
            <StatisticDomesticLevelDisplay selectState={selectState} />
          </div>
        </Container>
        <FixContainer z={10} variants={stickyVariants} isVisible={sticky && stateList.length > 0}>
          <StatisticDomesticCardDisplay selectState={selectState} />
        </FixContainer>

        <FixContainer z={11} variants={stickyVariants} isVisible={sticky && domesticQuery.isFetching}>
          <Loading />
        </FixContainer>
      </section>
      <Container variants={containerVariants(4)} isVisible={stateList.length > 0}>
        <MainUsCase data={stateList} onHover={handleMainDomesticCaseHover} onClick={handleMainDomesticCaseClick} />
      </Container>
    </motion.main>
  );
};

Uscase.getInitialProps = () => {
  return {};
};

export default Uscase;
