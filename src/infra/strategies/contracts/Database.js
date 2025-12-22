const NotImplementedException = require('../../../utils/errors/NotImplementedException');
const Crud = require('./Crud');

class Database extends Crud {
  connect() {
    throw new NotImplementedException();
  }

  disconnect() {
    throw new NotImplementedException();
  }
}

module.exports = Database;
