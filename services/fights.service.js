const { getData, saveData } = require("../repositories/fights.repository");

const getAllFights = () => {
  return getData().then((fightJsonString) => {
    try {
      return JSON.parse(fightJsonString);
    } catch (error) {
      throw error;
    }
  }, (error) => {
    throw error;
  });
};

const saveFight = (fight) => {
  return getAllFights().then((fights) => {
    let fightsList = fights;

    fightsList.push(fight);

    try {
      saveData(JSON.stringify(fightsList));
    } catch(error) {
      throw error;
    }
  });
};

module.exports = {
  getAllFights,
  saveFight
};