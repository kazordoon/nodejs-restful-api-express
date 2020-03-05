const app = require('./config/express')();

// Database connection
require('./config/database')(process.env.MONGO_URL);

app.listen(app.get('PORT'), () => {
  console.log(`Server running on *:${app.get('PORT')}`);
});
