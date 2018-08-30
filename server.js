const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log(JSON.stringify(
      {
        time: new Date(),
        method: req.method,
        url: req.originalUrl,
      }
    ));
    next();
  });

app.get('/health-check', (req, res) => {
    res.status(200).json({
        BUILD_NUMBER: process.env.BUILD_NUMBER || 'SNAPSHOT', 
        APP_ENV: process.env.APP_ENV || 'LOCAL'
    })
});

const server = app.listen("3000", () => {
    console.log('DOCKER Console API started on port 3000');
    console.log('  with app environment ' + process.env.APP_ENV);
});

module.exports = server;
