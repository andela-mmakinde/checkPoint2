import Users from '../controllers/user';
import Authorisation from '../middlewares/authorisation';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Users API',
  }));

// Not protected routes
  app.post('/api/v1/users', Users.create);
  app.post('/api/v1/users/login', Users.login);
  app.post('/api/v1/users/logout', Users.logout);

// Users & Admin
  app.put('/api/v1/users/:id', Authorisation.checkToken, Users.update);
  app.get('/api/v1/users/:id', Authorisation.checkToken, Authorisation.isAdmin, Users.retrieveOne);

// Admins only
  app.get('/api/v1/search/users', Authorisation.checkToken, Authorisation.isAdmin, Users.search);
  app.get('/api/v1/users', Authorisation.checkToken, Authorisation.isAdmin, Users.list);
  app.delete('/api/v1/users/:id', Authorisation.checkToken, Authorisation.isAdmin, Users.delete);
};
