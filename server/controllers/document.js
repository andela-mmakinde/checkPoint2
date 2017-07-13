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
      return res
        .status(401)
        .json({ message: 'Enter all required field' });
    }
    Document
      .findOne({
        where: {
          title: req.body.title
        }
      })
      .then((existingdocumentTitle) => {
        if (existingdocumentTitle !== null) {
          return res
            .status(409)
            .send({ message: 'A document with this title already exists!' });
        }
        return Document
          .create({
            title: req.body.title,
            roleId: req.body.roleId,
            content: req.body.content,
            ownerId: req.body.ownerId,
            access: req.body.access
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
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (req.user.roleId === 1) {
      Document
      .findAndCountAll({
        limit: Math.abs(limit) || 6,
        offset: Math.abs(offset) || 0,
        where: {
          $or: [
            {
              access: 'Public',
              ownerId: {
                $ne: req.user.id
              },
            },
            {
              access: 'Role',
              ownerId: {
                $not: req.user.id
              },
            },
          ]
        }
      })
      .then(document => (res.status(200).json({ document })))
      .catch(err => res.status(400).send(err));
    } else {
      const query = {
        limit: Math.abs(limit) || 6,
        offset: Math.abs(offset) || 0,
        where: {
          $or: [
            {
              access: 'Public',
              ownerId: {
                $ne: req.user.id
              },
            },
            {
              access: 'Role',
              roleId: req.user.roleId,
              ownerId: {
                $not: req.user.id
              },
            },
          ]
        }
      };
      Document
      .findAndCountAll(query)
      .then(document => (res.status(200).json({ document })))
      .catch(err => res.status(400).send(err));
    }
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
          id: req.params.id
        }
      })
      .then((document) => {
        if (!document || document === null) {
          return res
            .status(404)
            .send({ message: 'Document not found' });
        }
        if (document.access === 'Public') {
          return res
            .status(200)
            .send(document);
        }
        if (document.access === 'Private') {
          if (document.ownerId !== req.user.id) {
            return res
              .status(401)
              .json({ message: 'Unauthorized Access' });
          }
          return res
            .status(200)
            .send(document);
        }
        if (document.access === 'Role') {
          return User
            .findById(document.ownerId)
            .then((documentOwner) => {
              if (req.user.id !== 1 && Number(documentOwner.roleId) !== Number(req.user.roleId)) {
                return res
                  .status(401)
                  .json({ message: 'Unauthorized Access' });
              }
              return res
                .status(200)
                .send(document);
            });
        }
      })
      .catch(error => res.status(404).send(error));
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
    return Document
      .find({
        where: {
          id: req.params.id
        }
      })
      .then((document) => {
        if (!document) {
          return res
            .status(404)
            .send({ message: 'document Not Found' });
        }
        if (req.user.id !== document.ownerId) {
          return res
            .status(403)
            .json({ message: 'You cannot edit this document' });
        }
        return document
          .update({
            title: req.body.title || document.title,
            content: req.body.content || document.content,
            access: req.body.access || document.access
          })
          .then(updatedDocument => res.status(200).json({ message: 'Update Successful', updatedDocument }))
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
          id: req.params.id
        }
      })
      .then((document) => {
        if (!document) {
          return res
            .status(404)
            .send({ message: 'document Not Found' });
        }
        if (document.ownerId !== req.user.id) {
          return res
            .status(401)
            .json({ message: 'Unauthorized Access' });
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
    let dbQuery;
    if (req.user.roleId === 1) {
      dbQuery = {
        where: {
          title: {
            $iLike: `%${search}%`
          }
        }
      };
    } else {
      dbQuery = {
        where: {
          $and: {
            title: {
              $iLike: `%${search}%`
            }
          },
          $or: [
            {
              access: 'Private',
              ownerId: req.user.id
            },
            {
              access: 'Public',
            },
            {
              access: 'Role',
              roleId: req.user.roleId
            },
          ]
        }
      };
    }
    Document.findAll(dbQuery)
      .then((documents) => {
        if (documents.length === 0) {
          return res
            .status(404)
            .json({ message: 'Sorry, No document found' });
        }
        res
          .status(200)
          .send({ message: 'Found', documents });
      })
    .catch(error => res.status(400).send(error));
  },

  /**
   * Gets all documents created by a specific user which is checked by Id
   * Route: GET: /users/:id/documents
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  specificUserDocument(req, res) {
    User
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        if (!user || user === null) {
          return res
            .status(404)
            .send({ message: 'User not found' });
        }
        Document
          .findAll({
            where: {
              ownerId: user.id
            }
          })
          .then(ownerDocuments => res.send({ documentOwner: user, ownerDocuments }));
      });
  },

   /**
   * Gets all documents created by the currently logged in user
   * Route: GET: /mydoc
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  loggedInUserDocument(req, res) {
    Document
      .findAll({
        where: {
          ownerId: req.user.id
        }
      })
      .then(myDocuments => res.send({ myDocuments }));
  }
};
