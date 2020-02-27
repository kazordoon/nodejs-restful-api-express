const bcrypt = require('bcryptjs');

module.exports = (app) => {
  const { User } = app.models;
  const { generateToken } = app.utils;

  const register = async (req, res) => {
    try {
      const { usuario } = req.body;

      if (await User.findOne({ usuario })) {
        return res.status(400).json({ error: 'Este usuário já existe em nossa base de dados' });
      }

      const user = await User.create(req.body);

      return res.json({
        token: generateToken({ id: user.id }),
      }).status(201);
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possível criar uma nova conta' });
    }
  };

  const authenticate = async (req, res) => {
    try {
      const { usuario, senha } = req.body;

      // Como no model User foi definida a propriedade "select" para o campo "senha"
      // é necessário retornar a senha de volta com a função select
      const user = await User.findOne({ usuario }).select('+senha');

      if (!user) {
        return res.status(400).json({ error: 'Este usuário não existe' });
      }

      if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(401).json({ error: 'Falha na autenticação' });
      }

      return res.json({
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(401).json({ error: 'Falha na autenticação' });
    }
  };

  return {
    register,
    authenticate,
  };
};
