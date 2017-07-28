[![Build Status](https://travis-ci.org/andela-mmakinde/checkPoint2.svg?branch=staging)](https://travis-ci.org/andela-mmakinde/checkPoint2) [![Coverage Status](https://coveralls.io/repos/github/andela-mmakinde/checkPoint2/badge.svg?branch=staging)](https://coveralls.io/github/andela-mmakinde/checkPoint2?branch=staging)

### Welcome to DOC-GARAGE

DOC-GARAGE allows users to create, edit, retrieve and delete documents. It allows you to search for a particular document by title.
Pagination is added to allow for easy accessing of documents.
And what else? It is free!
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
For more info on using the api, click [here](http://docgarage.herokuapp.com/docs) for more info 


### Limitations
Users cannot share documents with specific users, but can only make document public to make it available to all users
The token generated on login cannot be nullified when signing out, the token only expires after a pre-set time

### Contributing
Contributions are most welcome. To contribute: 
1. open an issue in the issues tab on github
2. fork the repository
3. work on the feature
4. raise a PR to the staging branch.

### Licence
MIT