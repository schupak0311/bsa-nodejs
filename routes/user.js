let express = require('express');
let router = express.Router();

// Simple logging
let log4js = require('log4js');
log4js.configure({
  appenders: { server: { type: 'file', filename: 'server.log' } },
  categories: { default: { appenders: ['server'], level: 'ERROR' } }
});
let logger = log4js.getLogger('server');

const { getAllUsers, getUser, saveUser, updateUser, deleteUser } = require("../services/user.service");
const { userHasValidBody } = require("../middlewares/validate-body.middleware");

router.get('/', function(req, res, next) {
  getAllUsers().then((users) => {
    res.json(users);
  }).catch((error) => {
    logger.error(`${error.message} URL: ${req.originalUrl}`);
    res.status(500).send('Unable to get user data!');
  });
});

router.get('/:id', function(req, res, next) {
  getUser(req.params.id).then((user) => {
    if (!user) {
      throw new ReferenceError('No such user found!');
    } else {
      res.json(user);
    }
  }).catch((error) => {
    logger.error(`${error.message} URL: ${req.originalUrl}`);
    if (error instanceof ReferenceError) {
      res.status(404).send('No such user found!');
    } else {
      res.status(500).send('Unable to get user data!');
    }
  });
});

router.post('/', userHasValidBody, function(req, res, next) {
  if (req.body) {
    saveUser(req.body).then(() => {
      res.send('New user added!');
    }).catch((error) => {
      if (error instanceof SyntaxError) {
        res.status(400).send('Invalid data!');
      } else if(error instanceof ReferenceError) {
        res.send('User already exists!');
      } else {
        res.status(500).send('Unable to save data!');
      }
      logger.error(`${error.message} URL: ${req.originalUrl}`);
    });
  } else {
    res.status(400).send('Empty body!');
  }
});

router.put('/:id', userHasValidBody, function(req, res, next) {
  updateUser(req.body, req.params.id).then(() => {
    res.send('User updated!');
  }).catch((error) => {
    if (error instanceof SyntaxError) {
      res.status(400).send('Invalid data!');
    } else if(error instanceof ReferenceError) {
      res.send('User do not exist!');
    } else {
      res.status(500).send('Unable to save data!');
    }
    logger.error(`${error.message} URL: ${req.originalUrl}`);
  });
});

router.delete('/:id', function(req, res, next) {
  deleteUser(req.params.id).then(() => {
    res.send('User deleted!');
  }).catch((error) => {
    if(error instanceof ReferenceError) {
      res.send('User do not exist!');
    } else {
      res.status(500).send('Unable to save data!');
    }
    logger.error(`${error.message} URL: ${req.originalUrl}`);
  });
});

module.exports = router;
