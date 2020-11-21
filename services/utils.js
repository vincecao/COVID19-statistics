import axios from 'axios';
import { __api_host__, __api_host2__, __api_host3__, __api_key__ } from '../data/const';

export const getLocationPromise = () =>
  axios.get('https://www.iplocate.io/api/lookup/').then((response) => response.data);

export const getStatisticsPromise = () =>
  axios
    .get(`https://${__api_host2__}/statistics`, {
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': __api_host2__,
        'x-rapidapi-key': __api_key__,
        useQueryString: true,
      },
    })
    .then((response) => response.data.response);

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

export const getReportPromise = ({ iso = undefined, date = undefined, region_name = undefined }) =>
  axios
    .get(`https://${__api_host3__}/reports`, {
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': __api_host3__,
        'x-rapidapi-key': __api_key__,
        useQueryString: true,
      },
      params: {
        iso,
        date,
        region_name,
      },
    })
    .then((response) => response.data.data);
