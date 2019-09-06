const fs = require('fs');

const getData = () => {
  return new Promise((resolve, reject) => {
    let fightsJsonString = '';
    const fightsReadStream = fs.createReadStream('./data/fighthistory.json');

    fightsReadStream.on('error', (error) => {
      reject(error);
    });
    fightsReadStream.on('data', (chunk) => {
      fightsJsonString += chunk;
    });
    fightsReadStream.on('end', () => {
      if (!fightsJsonString) {
        fightsJsonString = '[]';
      }
      resolve(fightsJsonString);
    });
  });
};

const saveData = (fightData) => {
  fs.writeFile('./data/fighthistory.json', fightData, (error) => {
    if (error) return error;
  });
};

module.exports = {
  getData, saveData
};