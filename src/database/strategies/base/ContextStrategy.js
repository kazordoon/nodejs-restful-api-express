class ContextStrategy {
  constructor(strategy) {
    this.strategy = strategy;

    this.defaultFindOptions = { skip: 0, limit: 10 };
  }

  create(item) {
    return this.strategy.create(item);
  }

  find(item, options = this.defaultFindOptions) {
    return this.strategy.find(item, options);
  }

  findById(id) {
    return this.strategy.findById(id);
  }

  update(id, item) {
    return this.strategy.update(id, item);
  }

  delete(id) {
    return this.strategy.delete(id);
  }

  countDocuments() {
    return this.strategy.countDocuments();
  }
}

module.exports = ContextStrategy;
