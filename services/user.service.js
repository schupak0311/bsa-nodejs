const { getData, saveData } = require("../repositories/user.repository");

const getAllUsers = () => {
  return getData().then((userJsonString) => {
    try {
      return JSON.parse(userJsonString);
    } catch (error) {
      throw error;
    }
  }, (error) => {
    throw error;
  });
};

const getUser = (userId) => {
  return getData().then((userJsonString) => {
    try {
      const usersData = JSON.parse(userJsonString);
      return usersData[usersData.findIndex(user => user._id === userId)];
    } catch (error) {
      throw error;
    }
  }, (error) => {
    throw error;
  });
};

const saveUser = (user) => {
  return getAllUsers().then((users) => {
    let usersList = users;

    if (usersList.map(userFromList => userFromList._id).includes(user._id)) {
      throw new ReferenceError('User already exists!');
    }

    usersList.push(user);

    try {
      saveData(JSON.stringify(usersList));
    } catch(error) {
      throw error;
    }
  });
};

const updateUser = (user, userId) => {
  return getAllUsers().then((users) => {
    let usersList = users;

    if (!usersList.map(userFromList => userFromList._id).includes(userId)) {
      throw new ReferenceError('User do not exist!');
    }

    usersList[usersList.findIndex(userFromList => userFromList._id === user._id)] = user;

    try {
      saveData(JSON.stringify(usersList));
    } catch(error) {
      throw error;
    }
  });
};

const deleteUser = (userId) => {
  return getAllUsers().then((users) => {
    let usersList = users;

    if (!usersList.map(userFromList => userFromList._id).includes(userId)) {
      throw new ReferenceError('User do not exist!');
    }

    usersList.splice(usersList.findIndex(userFromList => userFromList._id === userId), 1);

    try {
      saveData(JSON.stringify(usersList));
    } catch(error) {
      throw error;
    }
  });
};

module.exports = {
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser
};
