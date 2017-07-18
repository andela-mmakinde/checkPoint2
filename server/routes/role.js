import Roles from '../controllers/role';
import Authorisation from '../middlewares/authorisation';

module.exports = (app) => {
  app.post('/api/role', Authorisation.checkToken, Authorisation.isAdmin, Roles.create);
  app.get('/api/roles', Authorisation.checkToken, Authorisation.isAdmin, Roles.getAll);
  app.put('/api/roles/:id', Authorisation.checkToken, Authorisation.isAdmin, Roles.update);
  app.get('/api/roles/:id', Authorisation.checkToken, Authorisation.isAdmin, Roles.findOne);
  app.delete('/api/roles/:id', Authorisation.checkToken, Authorisation.isAdmin, Roles.delete);
};
