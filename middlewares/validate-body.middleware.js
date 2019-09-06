const userHasValidBody = (req, res, next) => {
  if (
    req &&
    req.body._id &&
    req.body.name &&
    req.body.health &&
    req.body.attack &&
    req.body.defense &&
    req.body.source
  ) {
    next();
  } else {
    res.status(400).send('Incorrect user data!');
  }
};

const fightHasValidBody = (req, res, next) => {
  if (
    req &&
    req.body.fighterA &&
    req.body.fighterB &&
    req.body.winner &&
    req.body.date
  ) {
    next();
  } else {
    res.status(400).send('Incorrect fight data!');
  }
};

module.exports = {
  userHasValidBody, fightHasValidBody
};