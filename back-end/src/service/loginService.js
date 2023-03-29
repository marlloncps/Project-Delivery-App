const md5 = require('md5');
const { User } = require('../database/models');
const JwtAuth = require('../utils/Authentication');

const validateEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const login = async (email, password) => {
  const encryptedPass = md5(password);
  const response = await User.findOne({ where: { email, password: encryptedPass },
    attributes: { exclude: ['password'] },
  });
  if (!response) return null;
  const token = JwtAuth.generate(response);
  const { name, role } = response;
  return { name, email, role, token };
};

module.exports = {
  validateEmail,
  login,
};
