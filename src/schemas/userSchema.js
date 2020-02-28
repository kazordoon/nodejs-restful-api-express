const { check } = require('express-validator');

module.exports = (app) => {
  const usuario = check('usuario')
    .isLength({ min: 3, max: 20 })
    .withMessage('O nome de usuário deve possuir entre 3 e 20 carácteres')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('O nome de usuário deve possuir apenas letras e números');

  const senha = check('senha')
    .isLength({ min: 8, max: 50 })
    .withMessage('A senha deve possuir entre 8 e 50 carácteres');

  return [
    usuario,
    senha,
  ];
};
