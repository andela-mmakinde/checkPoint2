import documentsController from '../controllers/document';

module.exports = (app) => {
  app.post('/documents', documentsController.create);
  app.get('/documents', documentsController.listAllDocuments);
  app.get('/documents/:id', documentsController.retrieveDocument);
  app.put('/documents/:id', documentsController.updateDocument);
  app.delete('/documents/:id', documentsController.deleteDocument);
  app.get('/users/:id/documents', documentsController.specificUserDocument);
};
