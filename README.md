# COVID-19-statistics

Visualizing real-time COVID global data with [nivo](https://nivo.rocks/), [nextjs](https://nextjs.org/), typescript, [bulma](https://bulma.io/) and [framer-motion](https://github.com/framer/motion). Check more in [COVID-19-statistics](//covid-19-statistics.vercel.app/).


![covid-19-statistics](https://user-images.githubusercontent.com/17363908/192123487-dc2a2e94-b3ad-467c-bf10-95c931fd9228.png)

![Screen Shot 2022-09-24 at 5 49 04 PM](https://user-images.githubusercontent.com/17363908/192123646-fed73006-69d9-421b-b798-c792f7feefcb.png)



## Environment

`.env` file is needed in order to call API correctly. API_KEY could be found from [RapidAPI](https://rapidapi.com/hub)
``` env
API_KEY=<API_KEY>
COVID_API_HOST=covid-19-data.p.rapidapi.com
COVID_API_HOST2=covid-193.p.rapidapi.com
COVID_API_HOST3=covid-19-statistics.p.rapidapi.com

```

## Developement
```bash
# Install dependencies
pnpm i

# Add your pem files into `/certificates` folder, so your localhost can be hosted as HTTPS connection. 
# Recommand to use opensource mkcert library from github
# - certificates
#   - local.com+5-key.pem
#   - local.com+5.pem

# Start development mode
pnpm dev

# Build
pnpm build

# Lint and lint:fix
pnpm lint
pnpm lint:fix
```

