const md5 = require('md5');
const { User } = require('../database/models');

const getUser = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  return user;
};

const findAllUsers = async () => {
  const user = await User.findAll();
  return user;
};

const create = async (body) => {
  const { name, email, password, role } = body;
  const encryptedPass = md5(password);
  const newObjs = {
    name,
    email,
    password: encryptedPass,
    role,
  };
  const foundUser = await User.findAll({ where: {
    name: newObjs.name,
    email: newObjs.email,
  } });

  if (foundUser.length > 0) {
    throw new Error('Conflict');
  }

  const user = await User.create(newObjs);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = { getUser, findAllUsers, create, deleteUser };
