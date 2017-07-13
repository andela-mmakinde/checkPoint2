import rolesController from '../controllers/role';

module.exports = (app) => {
  app.post('/role', rolesController.create);
  app.get('/roles', rolesController.getAllRoles);
  app.put('/roles/:id', rolesController.updateRole);
  app.get('/roles/:id', rolesController.findRole);
  app.delete('/roles/:id', rolesController.deleteRole);
};
