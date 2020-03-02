const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // To not return the password
    },
  }, { versionKey: false });

  UserSchema.pre('save', async function hashPassword(next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
  });

  const User = mongoose.model('User', UserSchema);

  return User;
};
