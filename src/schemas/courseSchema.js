/* eslint-disable camelcase */
const { check } = require('express-validator');

module.exports = (app) => {
  const nome = check('nome')
    .isLength({ min: 5, max: 50 })
    .withMessage('O nome do curso deve possuir entre 5 e 50 carácteres');

  const descricao = check('descricao')
    .isLength({ min: 15, max: 100 })
    .withMessage('A descrição do curso deve possuir entre 15 e 100 carácteres');

  const carga_horaria = check('carga_horaria')
    .isInt({ min: 1 })
    .withMessage('A carga horária do curso deve ter pelo menos 1 hora');

  const total_aulas = check('total_aulas')
    .isInt({ min: 1 })
    .withMessage('O curso deve ter pelo menos 1 aula');

  const anoAtual = new Date().getFullYear();
  const ano = check('ano')
    .isInt({ min: 1970, max: anoAtual })
    .withMessage(`O ano do curso deve estar entre 1970 e ${anoAtual}`);

  const required = [nome, descricao, carga_horaria, total_aulas, ano];

  const optional = required.map((campo) => campo.optional());

  return {
    required,
    optional,
  };
};
