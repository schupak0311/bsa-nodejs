let express = require('express');
let router = express.Router();

// Simple logging
let log4js = require('log4js');
log4js.configure({
  appenders: { server: { type: 'file', filename: 'server.log' } },
  categories: { default: { appenders: ['server'], level: 'ERROR' } }
});
let logger = log4js.getLogger('server');

const { getAllFights, saveFight } = require("../services/fights.service");
const { fightHasValidBody } = require("../middlewares/validate-body.middleware");

router.get('/', function(req, res, next) {
  getAllFights().then((fights) => {
    res.json(fights);
  }).catch((error) => {
    logger.error(`${error.message} URL: ${req.originalUrl}`);
    res.status(500).send('Unable to get fights data!');
  });
});

router.post('/', fightHasValidBody, function(req, res, next) {
  if (req.body) {
    saveFight(req.body).then(() => {
      res.send('New fight saved!');
    }).catch((error) => {
      if (error instanceof SyntaxError) {
        res.status(400).send('Invalid data!');
      } else {
        res.status(500).send('Unable to save data!');
      }
      logger.error(`${error.message} URL: ${req.originalUrl}`);
    });
  } else {
    res.status(400).send('Empty body!');
  }
});

module.exports = router;