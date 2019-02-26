const express = require('express'); // eslint-disable-line
const bodyParser = require('body-parser'); // eslint-disable-line
const compression = require('compression'); // eslint-disable-line
const addRouters2App = require('./serverRoutes'); // eslint-disable-line

const CWD = process.cwd();
const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(express.static('dist'));
app.use('/static', express.static('dist'));

const getHome = (req, res) => res.sendFile(`${CWD}/dist/index.html`);

const getProperties = (req, res) => res.sendFile(`${CWD}/test/mockData/featuredProperties.json`);

app.get('/', getHome);
app.get('/not-found', getHome);
app.get('/search', getHome);
app.get('/my-account', getHome);
app.get('/about', getHome);
app.get('/agents', getHome);
app.get('/blog', getHome);
app.get('/contact', getHome);
app.get('/property/:name', getHome);
app.get('/blog/:name', getHome);

app.get('/api/properties/featured', getProperties);
app.get('/api/properties/recommended', getProperties);
app.get('/api/properties/hot', getProperties);

app.get('/api/search', (req, res) => {
  // eslint-disable-next-line
  const data = require(`${CWD}/test/mockData/featuredProperties.json`);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    data,
    total: 102,
  }));
});
app.get('/api/agents/list', (req, res) => {
  res.sendFile(`${CWD}/test/mockData/agents.json`);
});
app.get('/api/prices/list', (req, res) => {
  res.sendFile(`${CWD}/test/mockData/priceType.json`);
});
// app.get('/api/user/:id', (req, res) => {
//   res.sendFile(`${CWD}/test/mockData/userDetail.json`);
// });

addRouters2App(app);

app.use((req, res, next) => {
  res.status(500).send('something went wrong...');
});

app.listen(3000, () => console.log('App listening on port 3000!')); // eslint-disable-line
