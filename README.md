# API desenvolvida com Node.js
Uma API desenvolvida com Node.js e Express, utilizando como banco de dados o MongoDB.  
Para quem quiser testar a aplicação, ela está hospedada no [Heroku](https://nodejs-api-mongo.herokuapp.com/)

# Requisitos
- Node.js
- MongoDB
- NPM / Yarn

# Instalação
- Clone o repositório: `git clone https://github.com/kazordoon/nodejs-api-mongodb.git`
- No diretório do projeto, instale as dependências:
  - Com o NPM: `npm install`
  - Com o Yarn: `yarn install`
  
# Utilização
Primeiramente, você precisará alterar as variáveis de ambiente. Crie um arquivo chamado `.env` e insira os seguintes campos com seus valores:  
```
MONGO_URL=url_do_seu_banco
SECRET_KEY=key_para_autenticacao
```
Para que seja possível criar, atualizar ou deletar um curso da API, você precisará se autenticar enviando um JSON com os campos `usuario` e `senha` preenchidos com seus respectivos valores. Será retornado um token, o qual você colocará no campo `Authorization` no cabeçalho da requisição.  
Presumindo que a URL da aplicação seja `localhost` e esteja rodando na porta `3000`, o caminho para criar um registro seria `localhost:3000/auth/register` e para logar seria `localhost:3000/auth/authenticate`.
* * *
Agora que está tudo configurado, inicialize o servidor  
- NPM: `npm run start`
- Yarn: `yarn start`

# Licença
MIT
