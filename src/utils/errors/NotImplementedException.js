class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
    this.name = 'NotImplementedException';
  }
}

module.exports = NotImplementedException;
