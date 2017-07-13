import documentsController from '../controllers/document';
import checkToken from '../middlewares/authorisation';

module.exports = (app) => {
  app.post('/documents', checkToken, documentsController.create);
  app.get('/documents', checkToken, documentsController.listAllDocuments);
  app.get('/documents/:id', checkToken, documentsController.retrieveDocument);
  app.put('/documents/:id', checkToken, documentsController.updateDocument);
  app.delete('/documents/:id', checkToken, documentsController.deleteDocument);
  app.get('/users/:id/documents', checkToken, documentsController.specificUserDocument);
  app.get('/search/documents', checkToken, documentsController.search);
  app.get('/mydoc', checkToken, documentsController.loggedInUserDocument);
};
