const setupAuthRoutes = require('./authRoutes');
const setupCourseRoutes = require('./courseRoutes');

module.exports = async (app) => {
  await setupAuthRoutes(app);
  await setupCourseRoutes(app);
};
