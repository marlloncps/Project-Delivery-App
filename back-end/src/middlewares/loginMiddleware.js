const regex = /\S+@\S+\.\S+/;
const number = 6;

module.exports = class LoginMiddlewares {
  static validateEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email) || email === '') {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  static validatePassword(req, res, next) {
    const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length < number) {
    return res.status(400).json({ message: 'Password must have at least 6 characters' });
  }
  next();
  }
};

// module.exports = LoginMiddlewares;