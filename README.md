

# nodejs-restful-api-express

RESTful API made with Node.js where a registered user can list, create, update or delete courses that are stored in a database. It will be needed a token, which will be received when you log in.

## Getting Started

### Prerequisites

- MongoDB
- Redis
- Node.js
- NPM / Yarn

### Installing

- Clone the repository: `https://github.com/kazordoon/nodejs-restful-api-express.git`
- Get in the project directory: `cd nodejs-restful-api-express`
- Install the dependencies:
	- NPM: `npm i` | Remove the file `yarn.lock` before installing with NPM
	- Yarn: `yarn`

### Setting environment variables

Rename the `.env.example` file to the`.env`, then you will need to set the variable values ​​according to your environment.

### Running the server

* NPM: `npm run dev`
* Yarn: `yarn dev`

### API endpoints

#### Users
Action | Path | Body | Method | Returns
------ | --- | ----- | ------ | -------
Create a new user | /auth/register | A JSON with these [fields](#user-fields) | POST | A JSON with a token
Login into an account | /auth/login | A JSON with these [fields](#user-fields) | POST | A JSON with a token

#### Courses
Action | Path | Parameters | Body | Method | Returns
------ | --- | ---------- | ------ | ------- | -------
List all courses | /courses | -- | -- | GET | All courses
List one course | /courses/{id} | id | -- | GET | The course that has the same `id` as the one found in the `id` parameter
Create a new course | /courses | - | A JSON with these [fields](#course-fields) | POST | The created course
Update a existing course | /courses/{id} | id | A JSON with at least one of these [fields](#course-fields) | PATCH | The updated course
Delete a course | /courses/{id} | id | -- | DELETE | --

### How to use the token

You need to put the token on the authorization header.

### Input data validation

#### user-fields

- username
	- Type: string
	- Minimium characters: 3
	- Maximium characters: 20
- password
	- Type: string
	- Minimium characters: 8
	- Maximium characters: 50

#### course-fields

- name:
	- Type: string
	- Minimium characters: 5
	- Maximium characters: 50
- description
	- Type: string
	- Minimium characters: 15
	- Maximium characters: 100
- workload
	- Type: number
	- Minimium: 1
- total_classes
	- Type: number
	- Minimum: 1
- year
	-  Type: number
	- Minimum: 1970
	- Maximum: <current_year>

## Examples

See the [EXAMPLES.md](EXAMPLES.md).

## Built With

* [Node.js](https://nodejs.org) - JavaScript runtime environment that executes JavaScript code server-side
* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [mongoose](https://mongoosejs.com) - MongoDB object modeling tool
* [express](https://expressjs.com) - Minimalist web framework for Node.js
* [consign](https://github.com/jarradseers/consign) - Autoload for the scripts
* [cors](https://github.com/expressjs/cors) Node.js CORS middleware
* [express-validator](https://express-validator.github.io/docs/) - Data input validator
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - A library to help you hash passwords
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens
* [ioredis](https://github.com/luin/ioredis) - A robust, performance-focused and full-featured Redis client for Node.js

## Versioning

For the versions available, see the [tags on this repository](https://github.com/kazordoon/nodejs-restful-api-express/tags). 

## Authors

* **Felipe Barros** - *Initial work* - [kazordoon](https://github.com/kazordoon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
