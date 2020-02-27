const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

function generateToken(params) {
  return jwt.sign(params, process.env.SECRET_KEY, {
    expiresIn: 86400,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const { usuario } = req.body;

      if (await User.findOne({ usuario })) {
        return res.status(400).json({ error: 'Este usuário já existe em nossa base de dados' });
      }

      const user = await User.create(req.body);

      return res.json({
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ocorreu um erro ao registrar o usuário, tente novamente' });
    }
  },
  async authenticate(req, res) {
    try {
      const { usuario, senha } = req.body;

      // Como no model User foi definida a propriedade "select" para o campo "senha"
      // é necessário retornar a senha de volta com a função select
      const user = await User.findOne({ usuario }).select('+senha');

      if (!user) {
        return res.status(400).json({ error: 'Este usuário não existe' });
      }

      if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).json({ error: 'Senha incorreta' });
      }

      return res.json({
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'Erro na autenticação' });
    }
  },
};
