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
