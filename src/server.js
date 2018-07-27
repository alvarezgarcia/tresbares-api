const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {mongoUri} = require('./config');
const mongoDb = require('./dbs/mongo');

const router = require('./routes/');

const port = 5555;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);

app.use(morgan('dev'));

async function start(mongoUri) {
  await mongoDb.connect(mongoUri);
  console.log('Connected to mongoDB');

  console.log(`Listening on port ${port}`);
  await app.listen(port);
}

try {
  start(mongoUri);  
} catch (err) {
  console.log('Err', err);
}
