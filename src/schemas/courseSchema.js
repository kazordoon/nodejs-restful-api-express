/* eslint-disable camelcase */
const { checkSchema } = require('express-validator');

module.exports = (app) => {
  const anoAtual = new Date().getFullYear();

  const requiredSchema = checkSchema({
    nome: {
      isLength: {
        options: { min: 5, max: 50 },
      },
      errorMessage: 'O nome do curso deve possuir entre 5 e 50 carácteres',
    },
    descricao: {
      isLength: {
        options: { min: 15, max: 100 },
      },
      errorMessage: 'A descrição do curso deve possuir entre 15 e 100 carácteres',
    },
    carga_horaria: {
      isInt: {
        options: { min: 1 },
      },
      errorMessage: 'A carga horária do curso deve ter pelo menos 1 hora',
    },
    total_aulas: {
      isInt: {
        options: { min: 1 },
      },
      errorMessage: 'O curso deve ter pelo menos 1 aula',
    },
    ano: {
      isInt: {
        options: { min: 1970, max: anoAtual },
      },
      errorMessage: `O ano do curso deve estar entre 1970 e ${anoAtual}`,
    },
  });

  const optionalSchema = checkSchema({
    nome: {
      isLength: {
        options: { min: 5, max: 50 },
      },
      errorMessage: 'O nome do curso deve possuir entre 5 e 50 carácteres',
      optional: true,
    },
    descricao: {
      isLength: {
        options: { min: 15, max: 100 },
      },
      errorMessage: 'A descrição do curso deve possuir entre 15 e 100 carácteres',
      optional: true,
    },
    carga_horaria: {
      isInt: {
        options: { min: 1 },
      },
      errorMessage: 'A carga horária do curso deve ter pelo menos 1 hora',
      optional: true,
    },
    total_aulas: {
      isInt: {
        options: { min: 1 },
      },
      errorMessage: 'O curso deve ter pelo menos 1 aula',
      optional: true,
    },
    ano: {
      isInt: {
        options: { min: 1970, max: anoAtual },
      },
      errorMessage: `O ano do curso deve estar entre 1970 e ${anoAtual}`,
      optional: true,
    },
  });

  return {
    requiredSchema,
    optionalSchema,
  };
};


/*
const { check } = require('express-validator');

module.exports = (app) => {
  const nome = check('nome')
    .isLength({ min: 5, max: 50 })
    .withMessage('O nome do curso deve possuir entre 5 e 50 carácteres')
    .optional();

  const descricao = check('descricao')
    .isLength({ min: 15, max: 100 })
    .withMessage('A descrição do curso deve possuir entre 15 e 100 carácteres')
    .optional();

  const carga_horaria = check('carga_horaria')
    .isInt({ min: 1 })
    .withMessage('A carga horária do curso deve ter pelo menos 1 hora')
    .optional();

  const total_aulas = check('total_aulas')
    .isInt({ min: 1 })
    .withMessage('O curso deve ter pelo menos 1 aula')
    .optional();

  const anoAtual = new Date().getFullYear();
  const ano = check('ano')
    .isInt({ min: 1970, max: anoAtual })
    .withMessage(`O ano do curso deve estar entre 1970 e ${anoAtual}`)
    .optional();

  const requiredSchema = [nome, descricao, carga_horaria, total_aulas, ano];
  const optionalSchema = [...requiredSchema].map(field => field.optional());

  return {
    requiredSchema,
    optionalSchema,
  };
};
*/
