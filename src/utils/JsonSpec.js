module.exports = (app) => {
  class JsonSpec {
    /**
     * @param {string} type
     * @param {{_id: string, ...attributes}} target
     * @param {string} pagePath
     */
    static convertOne(type, target, pagePath) {
      const data = {
        type,
        id: target._id,
        attributes: {
          ...target,
        },
      };
      const links = {
        self: pagePath,
      };

      const response = {
        data,
        links,
      };

      return response;
    }

    /**
     * @param {string} type
     * @param {{_id: string, ...attributes}[]} targets
     * @param {{ path: string, current: number, total: number }} page
     */
    static convertMany(type, targets, page) {
      const firstPage = 1;
      const lastPage = page.total;
      let nextPage = page.current + 1;
      let previousPage = page.current - 1;

      const nextPageExceedsTheLastPage = nextPage > lastPage;
      if (nextPageExceedsTheLastPage) {
        nextPage = null;
      }

      const previousPageDoesNotExist = previousPage === 0;
      if (previousPageDoesNotExist) {
        previousPage = null;
      }

      const data = targets.map((target) => ({
        type,
        id: target._id,
        attributes: {
          ...target,
        },
      }));
      const links = {
        self: page.path,
        first: firstPage,
        prev: previousPage,
        next: nextPage,
        last: lastPage,
      };

      const response = {
        data,
        links,
      };

      return response;
    }
  }

  return JsonSpec;
};
