const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false // Impede que a senha seja retornada ao usuário
  }
}, { versionKey: false });

// Criptografando a senha antes de salvá-la no banco de dados
UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const User = mongoose.model('Usuario', UserSchema);

module.exports = User;