import documentsController from '../controllers/document';
import middleware from '../middlewares/authorisation';

module.exports = (app) => {
  app.post('/documents', middleware.checkToken, documentsController.create);
  app.get('/documents', middleware.checkToken, documentsController.listAllDocuments);
  app.get('/documents/:id', middleware.checkToken, documentsController.retrieveDocument);
  app.put('/documents/:id', middleware.checkToken, documentsController.updateDocument);
  app.delete('/documents/:id', middleware.checkToken, documentsController.deleteDocument);
  app.get('/users/:id/documents', middleware.checkToken, documentsController.specificUserDocument);
  app.get('/search/documents', middleware.checkToken, documentsController.search);
  app.get('/mydoc', middleware.checkToken, documentsController.loggedInUserDocument);
};
