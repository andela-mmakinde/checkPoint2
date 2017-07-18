import Users from '../controllers/user';
import Authorisation from '../middlewares/authorisation';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Users API',
  }));

// Not protected routes
  app.post('/api/users', Users.create);
  app.post('/api/users/login', Users.login);
  app.post('/api/users/logout', Users.logout);

// Users & Admin
  app.put('/api/users/:id', Authorisation.checkToken, Users.update);
  app.get('/api/users/:id', Authorisation.checkToken, Authorisation.isAdmin, Users.retrieveOne);

// Admins only
  app.get('/api/search/users', Authorisation.checkToken, Authorisation.isAdmin, Users.search);
  app.get('/api/users', Authorisation.checkToken, Authorisation.isAdmin, Users.list);
  app.delete('/api/users/:id', Authorisation.checkToken, Authorisation.isAdmin, Users.delete);
};
