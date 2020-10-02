const mongoose = require('mongoose');
const Encrypter = require('../../utils/Encrypter');

module.exports = () => {
  const UserSchema = new mongoose.Schema(
    {
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
    },
    { versionKey: false },
  );

  UserSchema.pre('save', async function hashPassword(next) {
    const hashedPassword = await Encrypter.hash(this.password);
    this.password = hashedPassword;

    next();
  });

  const User = mongoose.model('User', UserSchema);

  return User;
};
