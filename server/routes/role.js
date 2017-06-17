import rolesController from '../controllers/role';

module.exports = (app) => {
  app.post('/role', rolesController.create);
};
