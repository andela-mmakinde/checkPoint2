import usersController from '../controllers/user';
import checkToken from '../middlewares/authorisation';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Users API',
  }));

  app.post('/users', usersController.create);
  app.get('/users', checkToken, usersController.list);
  app.put('/users/:id', usersController.update);
  app.post('/users/login', usersController.login);
  app.post('/users/logout', usersController.logout);
  app.delete('/users/:id', usersController.deleteRecord);
  app.get('/search/users', usersController.search);
};
