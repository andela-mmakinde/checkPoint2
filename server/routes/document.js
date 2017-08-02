import Documents from '../controllers/document';
import Authorisation from '../middlewares/authorisation';

module.exports = (app) => {
  app.post('/api/v1/documents', Authorisation.checkToken, Documents.create);
  app.get('/api/v1/documents', Authorisation.checkToken, Documents.listAll);
  app.get('/api/v1/documents/:id',
  Authorisation.checkToken, Documents.retrieveOne);
  app.put('/api/v1/documents/:id', Authorisation.checkToken, Documents.update);
  app.delete('/api/v1/documents/:id',
  Authorisation.checkToken, Documents.delete);
  app.get('/api/v1/users/:id/documents',
  Authorisation.checkToken, Documents.getMine);
  app.get('/api/v1/search/documents',
  Authorisation.checkToken, Documents.search);
};
