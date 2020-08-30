# COVID19-statistics

Tech Stack:

* [next.js](https://nextjs.org/)
* Typescript
* [react-query](https://react-query.tanstack.com/)
* [bulma](https://bulma.io/)
* [nivo](https://nivo.rocks/)
* [rapidapi](https://rapidapi.com/)
* [vercel](vercel.com)

# Deploy

``` js
/* Config env, add .env file with following three environment
 - API_KEY
 - COVID_API_HOST: covid-19-data.p.rapidapi.com
 - COVID_API_HOST2: covid-193.p.rapidapi.com
 - COVID_API_HOST2: covid-19-statistics.p.rapidapi.com
*/

yarn install

// Replace your certificates key and cert under /certificates folder for local https testing, recommand using mkcert

yarn dev
```

# Feature

* Always sync with latest covid19 statistic
