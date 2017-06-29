import { User, Document } from '../models';

module.exports = {

  /**
   * Creates a new document
   * Route: POST: /documents
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  create(req, res) {
    if (!req.body.title || !req.body.content || !req.body.access) {
      return res.status(401).json({ message: 'Enter all required field' });
    }
    Document.findOne({
      where: {
        title: req.body.title
      }
    }).then((existingdocumentTitle) => {
      if (existingdocumentTitle !== null) {
        return res.status(409).send({
          message: 'A document with this title already exists!'
        });
      }
      return Document
        .create({
          title: req.body.title,
          roleId: req.body.roleId,
          content: req.body.content,
          ownerId: req.body.ownerId,
          access: req.body.access,
        })
        .then(document => res.status(201).send({ message: 'Document created', document }))
        .catch(err => res.status(400).send(err));
    });
  },


  /**
   * List all documents in the database
   * Route: GET: /documents
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  listAllDocuments(req, res) {
    return Document.all()
      .then(document => res.status(200).json({ document }))
      .catch(err => res.status(400).send(err));
  },

  /**
   * Retrieves documents in the database by the id
   * Route: GET: /documents/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  retrieveDocument(req, res) {
    return Document
      .findOne({
        where: {
          id: req.params.id,
        },
      }).then((document) => {
        if (!document || document === null) {
          return res.status(404).send({ message: 'Document not found' });
        }
        res.status(200).send(document);
      });
  },

  /**
   * Updates content of documents in the database
   * Route: PUT: /documents/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  updateDocument(req, res) {
    return Document.find({
      where: {
        id: req.params.id
      }
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'document Not Found'
        });
      }
      return document
        .update({
          title: req.body.title || document.title,
          content: req.body.content || document.content,
          access: req.body.access || document.access,
        })
        .then(updatedDocument => res.status(200).send(updatedDocument))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  /**
   * Deletes specified document from the database
   * Route: DELETE: /documents/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  deleteDocument(req, res) {
    return Document
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'document Not Found',
          });
        }
        return document
          .destroy()
          .then(() => res.status(201).send({ message: 'document deleted successfully' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Searches for documents in the database
   * Route: GET: /search/documents
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  search(req, res) {
    const search = req.query.q;
    Document.findAll({
      where: { title: { $iLike: `%${search}%` } }
    })
      .then((documents) => {
        if (documents.length === 0) {
          return res.status(404).json({
            message: 'Sorry, No document found'
          });
        }
        res.status(200).send({ message: 'Found', documents });
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Gets all documents created by a specific user
   * Route: GET: /users/:id/documents
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  specificUserDocument(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      if (!user || user === null) {
        return res.status(404).send({ message: 'User not found' });
      }
      Document.findAll({
        where: {
          ownerId: user.id,
        },
      })
      .then(ownerDocuments => res.send({
        documentOwner: user,
        ownerDocuments,
      }));
    });
  },
};
