import Roles from '../controllers/role';
import Authorisation from '../middlewares/authorisation';

module.exports = (app) => {
  // Admins only
  app.post('/api/v1/role', Authorisation.checkToken, Authorisation.isAdmin, Roles.create);
  app.get('/api/v1/roles', Authorisation.checkToken, Authorisation.isAdmin, Roles.getAll);
  app.put('/api/v1/roles/:id', Authorisation.checkToken, Authorisation.isAdmin, Roles.update);
  app.get('/api/v1/roles/:id', Authorisation.checkToken, Authorisation.isAdmin, Roles.findOne);
  app.delete('/api/v1/roles/:id', Authorisation.checkToken, Authorisation.isAdmin, Roles.delete);
};
