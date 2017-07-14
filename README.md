[![Build Status](https://travis-ci.org/andela-mmakinde/checkPoint2.svg?branch=staging)](https://travis-ci.org/andela-mmakinde/checkPoint2) [![Coverage Status](https://coveralls.io/repos/github/andela-mmakinde/checkPoint2/badge.svg?branch=staging)](https://coveralls.io/github/andela-mmakinde/checkPoint2?branch=staging)

### Welcome to DOC-GARAGE

DOC-GARAGE allows users to create, edit, retrieve and delete documents.
[Click here](http://docgarage.herokuapp.com/) to view the app on Heroku.

### Core Tecnologies
-----------
The application was developed with [NodeJs](https://nodejs.org/en/docs/) while using [Express](http://expressjs.com) for routing.
The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM.
The user interface was built using [ReactJS]((http://reactjs.cn/react/docs) with the [Redux](http://redux.js.org/) architecture.
[Webpack](https://webpack.js.org/configuration/) was used to bundle modules and [Babel](http://babeljs.io) was used to transpile all code to es5

### Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `git clone https://github.com/andela-mmakinde/checkPoint2.git`
3.  Change your directory `cd checkPoint2`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run `npm run db:migrate` and then `sequelize db:seed:all` to populate your database with initial roles and user data.
7.  Start the app `npm run dev`.

### API ENDPOINTS
Access for the endpoints are restricted based on the Authorization token assigned to the user.
Users are assigned a JWT on creating an account and login to the system, this token is therefore used to authorise access to the API endpoints.

**Users**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
GET | [/search/users](#get-a-user) | Search for a user with a search query
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from database
POST | [/users/login](#login) | To log a user in
POST | [/users/logout](#logout) | Log a user out

**Roles**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/roles](#create-a-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
GET | [/roles/:id](#get-roles) | Get a users role by passing in the id
PUT | [/roles/:id](#update-a-role) | Update a new role
DELETE | [/roles/:id](#delete-a-role) | Delete a role

**Documents**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/documents](#create-a-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
GET | [/mydoc](#get-document) | Retrieve the logged in users documents
GET | [/users/:id/documents](#get-documents-by-userId) | Retrieve all documents created by a user
GET | [/documents?offset=1&limit=10](#get-documents) | Retrieve maximum of first 10 documents
PUT | [/documents/:id](#update-a-document) | Update a specific document
DELETE | [/documents/:id](#delete-a-document) | Delete a specific document

### Limitations
The app currently cannot handle more than 3,000,000,000 users or documents but can be scalled up if the need arises.

### Contributing
Contributions are most welcome. Simply open an issue in the issues tab on github, fork the repository, work on the feature and raise a PR to the staging branch.

### Licence
MIT