const app = require('./src/config/express')();

// Conectando com o banco de dados
require('./src/config/database')(process.env.MONGO_URL);

// Rodando o servidor
app.listen(app.get('PORT'), () => {
  console.log('Servidor rodando na porta ' + app.get('PORT'));
});