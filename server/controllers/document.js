import { User, Document } from '../models';
import pagination from '../helpers/pagination';


const Documents = {

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
        .status(400)
        .json({ message: 'Please fill out all fields' });
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
            roleId: req.user.roleId,
            content: req.body.content,
            ownerId: req.user.id,
            access: req.body.access
          })
          .then(document => res.status(201)
          .send({ message: 'Document created', document }))
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
  listAll(req, res) {
    let query;
    const limit = req.query.limit || 8;
    const offset = req.query.offset || 0;
    if (req.user.roleId === 1) {
      query = {
        limit,
        offset,
        where: {
          $or: [
            {
              access: 'Public',
            },
            {
              access: 'Role',
            },
            {
              access: 'Private',
              ownerId: req.user.id,
            },
          ]
        },
        order: [['updatedAt', 'DESC']]
      };
    } else {
      query = {
        limit,
        offset,
        where: {
          $or: [
            {
              access: 'Public',
            },
            {
              access: 'Role',
              roleId: req.user.roleId,
            },
            {
              access: 'Private',
              ownerId: req.user.id,
            },
          ]
        },
        order: [['updatedAt', 'DESC']]
      };
    }
    Document
      .findAndCountAll(query)
      .then((document) => {
        const response = {
          document: document.rows,
          pagination: pagination(document.count, limit, offset)
        };
        res.status(200).send(response);
      })
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
  retrieveOne(req, res) {
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
              if (req.user.id !== 1 &&
              Number(documentOwner.roleId) !== Number(req.user.roleId)) {
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
      .catch(error => res.status(400).send(error));
  },

  /**
   * Updates content of documents in the database
   * Route: PUT: /documents/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  update(req, res) {
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
          .then(updatedDocument => res.status(200)
          .json({ message: 'Update Successful', updatedDocument }))
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
  delete(req, res) {
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
          .then(() => res.status(200)
          .send({ message: 'document deleted successfully' }))
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
    const pageType = req.query.pageType;
    const limit = req.query.limit || 8;
    const offset = req.query.offset || 0;
    let dbQuery;
    if (pageType === 'myDocuments') {
      dbQuery = {
        where: {
          title: {
            $iLike: `%${search}%`
          },
          ownerId: req.user.id
        },
        order: [['updatedAt', 'DESC']]
      };
    } else {
      dbQuery = {
        limit,
        offset,
        where: {
          title: {
            $iLike: `%${search}%`
          },
          $or: [
            {
              access: 'Public',
            },
            {
              access: 'Role',
              roleId: {
                $gte: req.user.roleId
              },
            },
            {
              access: 'Private',
              ownerId: req.user.id,
            },
          ]
        },
        order: [['updatedAt', 'DESC']]
      };
    }
    Document.findAndCountAll(dbQuery)
      .then((document) => {
        const response = {
          document: document.rows,
          pagination: pagination(document.count, limit, offset)
        };
        res.status(200).send(response);
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
  getMine(req, res) {
    const limit = req.query.limit || 8;
    const offset = req.query.offset || 0;
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
          .findAndCountAll({
            limit,
            offset,
            where: {
              ownerId: user.id
            },
            order: [['updatedAt', 'DESC']]
          })
          .then((ownerDocuments) => {
            const response = {
              myDocuments: ownerDocuments.rows,
              pagination: pagination(ownerDocuments.count, limit, offset)
            };
            res.status(200).send(response);
          });
      });
  }
};
export default Documents;

