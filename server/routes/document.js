import Documents from '../controllers/document';
import Authorisation from '../middlewares/authorisation';

module.exports = (app) => {
  app.post('/api/documents', Authorisation.checkToken, Documents.create);
  app.get('/api/documents', Authorisation.checkToken, Documents.listAll);
  app.get('/api/documents/:id', Authorisation.checkToken, Documents.retrieveOne);
  app.put('/api/documents/:id', Authorisation.checkToken, Documents.update);
  app.delete('/api/documents/:id', Authorisation.checkToken, Documents.delete);
  app.get('/api/users/:id/documents', Authorisation.checkToken, Documents.getMine);
  app.get('/api/search/documents', Authorisation.checkToken, Documents.search);
};
