const mongoose = require('mongoose');
const Database = require('../contracts/Database');
const config = require('../../../config/database')();

class MongoDB extends Database {
  constructor(connection, schema) {
    super();

    this.schema = schema;
    this.connection = connection;
  }

  static async connect() {
    let connection;

    if (!MongoDB.connection) {
      await mongoose.connect(config.URL, config.options);
      connection = mongoose.connection;
    }

    return connection;
  }

  static async disconnect() {
    await mongoose.disconnect();
  }

  async create(item) {
    const result = await this.schema.create(item);
    return result;
  }

  async find(item = {}, { skip, limit } = {}) {
    const result = await this.schema.find(item).skip(skip).limit(limit);
    return result;
  }

  async findById(id) {
    const result = await this.schema.findById(id);
    return result;
  }

  async update(id, item) {
    const result = await this.schema.findByIdAndUpdate(
      id,
      { $set: { ...item } },
      { new: true },
    );
    return result;
  }

  async delete(id) {
    await this.schema.findByIdAndDelete(id);
    return true;
  }

  async countDocuments() {
    const total = await this.schema.countDocuments();
    return total;
  }
}

module.exports = MongoDB;
