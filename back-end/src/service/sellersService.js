const { User } = require('../database/models');

const findAll = async (role) => {
  const sellers = await User.findAll({ where: { role } });
  return sellers;
};

module.exports = {
  findAll,
};
