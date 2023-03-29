const { 
  exists,
  registerUser,
  getUser,
  validationName,
  validationEmail,
  validationPassword,
} = require('../service/registerService');

const returnResponseRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await registerUser(name, email, password);
    const user = await getUser(email);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: `Try again later ${error.message}` });
  }
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const verifyExists = await exists(name, email);
  if (validationName(name) || validationEmail(email) || validationPassword(password)) {
    return res.status(400).json({ message: 'Invalid data for submission.' });
  }
  if (verifyExists) return res.status(409).json({ message: 'This name or email already exists.' });
  await returnResponseRegister(req, res);
};

module.exports = registerController;