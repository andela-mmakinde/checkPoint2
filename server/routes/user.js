import usersController from '../controllers/user';
import middleware from '../middlewares/authorisation';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Users API',
  }));

  app.post('/users', usersController.create);
  app.get('/users', middleware.checkToken, middleware.allowAdminAccess, usersController.list);
  app.put('/users/:id', middleware.checkToken, usersController.update);
  app.post('/users/login', usersController.login);
  app.post('/users/logout', usersController.logout);
  app.delete('/users/:id', middleware.checkToken, middleware.allowAdminAccess, usersController.deleteRecord);
  app.get('/search/users', middleware.checkToken, middleware.allowAdminAccess, usersController.search);
  app.get('/users/:id', middleware.checkToken, middleware.allowAdminAccess, usersController.retrieveUser);
};
