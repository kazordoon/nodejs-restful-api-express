module.exports = () => {
  function getNotNullProperties(target) {
    const notNullProperties = Object.entries(target)
      .filter(([key, value]) => {
        if (value) {
          return [key, value];
        }

        return null;
      })
      .map(([key, value]) => ({
        [key]: value,
      }))
      .reduce(
        (previous, current) => ({
          ...previous,
          ...current,
        }),
        {},
      );

    return notNullProperties;
  }

  return getNotNullProperties;
};
