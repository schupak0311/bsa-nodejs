const fs = require('fs');

const getData = () => {
  return new Promise((resolve, reject) => {
    let usersJsonString = '';
    const usersReadStream = fs.createReadStream('./data/userlist.json');

    usersReadStream.on('error', (error) => {
      reject(error);
    });
    usersReadStream.on('data', (chunk) => {
      usersJsonString += chunk;
    });
    usersReadStream.on('end', () => {
      if (!usersJsonString) {
        usersJsonString = '[]';
      }
      resolve(usersJsonString);
    });
  });
};

const saveData = (userData) => {
  fs.writeFile('./data/userlist.json', userData, (error) => {
    if (error) return error;
  });
};

module.exports = {
  getData, saveData
};
