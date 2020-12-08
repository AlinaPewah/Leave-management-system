const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
// require('./jobs');

const staticFileMiddleware = express.static('dist');

require('dotenv').config();
// require('./server/service/create_admin');

global.appRoot = __dirname;

const app = express();
app.use(staticFileMiddleware);

app.use(cors());
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' ')));
//  parse JSON-encoded bodies and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Constants
const PORT = process.env.PORT || 8080;
// const HOST = '0.0.0.0';
const base = '/api';

const routes = require('./server/api/routes');

routes(app, base);
app.use(history({ index: '/index.html' }));
app.use(staticFileMiddleware);
// app.listen(PORT, HOST);
app.listen(PORT, () => {
  console.debug(`Running on port:${PORT}`);
});
// console.log(`Running on http://${HOST}:${PORT}`);
