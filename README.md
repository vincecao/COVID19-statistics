# COVID19-statistics

Tech Stack:

- [Next.js](https://nextjs.org/)
- Typescript
- [bulma](https://bulma.io/)
- [rapidapi](https://rapidapi.com/)
- [nivo](https://nivo.rocks/)
- [vercel](vercel.com)

# Deploy

```js
/* Modify next.config.sample.js with your api-key and rename as next.config.js with following three environment
 - API_KEY
 - COVID_API_HOST: covid-19-data.p.rapidapi.com
 - COVID_API_HOST2: covid-193.p.rapidapi.com
*/

yarn install

// Replace your certificates key and cert under /certificates folder for local https testing, recommand using mkcert

yarn dev
```
