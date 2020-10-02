const { check } = require('express-validator');

module.exports = () => {
  const username = check('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('Username must contain only letters and numbers');

  const password = check('password')
    .isLength({ min: 8, max: 50 })
    .withMessage('User password must be between 8 to 50 characters');

  return [username, password];
};
