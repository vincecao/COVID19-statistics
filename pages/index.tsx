import Head from 'next/head';
import { useState, useEffect } from 'react';
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
            [country.name]: country.alpha3code,
          };

          return null;
        });

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
                console.log(response.data.response);
                resolve(
                  response.data.response.map((statistic) => ({
                    name: statistic.country,
                    id: countryMap[statistic.country],
                    value: statistic.cases.total,
                    cases: statistic.cases,
                    death: statistic.deaths,
                    tests: statistic.tests,
                    population: statistic.population,
                  }))
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
        country: {
          name: _us.name,
          id: _us.id,
        },
        cases: _us.cases,
        death: _us.death,
        tests: _us.tests,
        population: _us.population,
      });
    }
  }, [countriesList]);

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

        {countriesList.length === 0 && (
          <progress className="progress is-small is-warning" max="100">
            15%
          </progress>
        )}
        {countriesList.length > 0 && (
          <div className="mt-5">
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
        )}
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
              console.log(e);
              setSelectCountry({
                country: {
                  name: e.data.name,
                  id: e.data.id,
                },
                cases: e.data.cases,
                death: e.data.death,
                tests: e.data.tests,
                population: e.data.population,
              });
            }
          }}
        />
      </main>

      <footer></footer>
    </div>
  );
}
