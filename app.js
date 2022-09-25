/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const { readFileSync } = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("./certificates/local.com+5-key.pem"),
  cert: readFileSync("./certificates/local.com+5.pem"),
};

async function init(){
  await app.prepare()
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log("> Ready on https://localhost:3000");
  });
}

init();