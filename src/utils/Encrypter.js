const bcrypt = require('bcryptjs');

class Encrypter {
  static async hash(value) {
    const hash = await bcrypt.hash(value, 10);
    return hash;
  }

  static async compare(value, hash) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}

module.exports = Encrypter;
