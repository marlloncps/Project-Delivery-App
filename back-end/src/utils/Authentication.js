const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config();

module.exports = class JwtAuth {
  static validation(token) {
    try {
      const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
      jwt.verify(token, jwtSecret);
      return true;
    } catch (error) {
      return false;
    }
  }

  static generate(data) {
    const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
    const jwtConfig = { expiresIn: '15d', algorithm: 'HS256' };
    const token = jwt.sign(data.toJSON(), jwtSecret, jwtConfig);
    return token;
  }
};
