const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // eslint-disable-next-line consistent-return
  const auth = (req, res, next) => {
    // A sintaxe da autorização presente no cabeçalho da requisição deve ser como abaixo
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'O token não foi fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Erro no token' });
    }

    const [scheme, token] = parts;

    if (scheme.toLowerCase() !== 'bearer') {
      return res.status(401).json({ error: 'Token malformatado' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      return next();
    });
  };

  return auth;
};
