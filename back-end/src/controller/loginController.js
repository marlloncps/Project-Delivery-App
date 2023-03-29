const { login } = require('../service/loginService');
require('dotenv').config();

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (!user) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: `Try again later ${error.message}` });
  }
};

module.exports = loginController;