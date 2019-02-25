const express = require('express'); // eslint-disable-line

const CWD = process.cwd();
const app = express();

app.use(express.static('dist'));
app.use('/static', express.static('dist'));

const getHome = (req, res) => res.sendFile(`${CWD}/dist/test.html`);

const getProperties = (req, res) => res.sendFile(`${CWD}/src/test/mockData/featuredProperties.json`);

app.get('/', getHome);
app.get('/search', getHome);
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
  const data = require(`${CWD}/src/test/mockData/featuredProperties.json`);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    data,
    total: 102,
  }));
});
app.get('/api/agents/list', (req, res) => {
  res.sendFile(`${CWD}/src/test/mockData/agents.json`);
});
app.get('/api/prices/list', (req, res) => {
  res.sendFile(`${CWD}/src/test/mockData/priceType.json`);
});
app.get('/api/user/:id', (req, res) => {
  res.sendFile(`${CWD}/src/test/mockData/userDetail.json`);
});

app.use((err, req, res) => {
  res.status(500).send('something went wrong...');
});

app.listen(3000, () => console.log('App listening on port 3000!')); // eslint-disable-line
