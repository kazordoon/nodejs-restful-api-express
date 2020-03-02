const app = require('./src/config/express')();

// Database connection
require('./src/config/database')(process.env.MONGO_URL);

app.listen(app.get('PORT'), () => {
  console.log(`Server running on *:${app.get('PORT')}`);
});
