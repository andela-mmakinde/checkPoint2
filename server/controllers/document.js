import { User } from '../models';
import { Document } from '../models';

module.exports = {
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        ownerId: req.body.ownerId,
      })
      .then(document => res.status(201).send({ message: 'Document created', document }))
      .catch(err => res.status(400).send(err));
  },

  listAllDocuments(req, res) {
    return Document.all()
      .then(document => res.status(200).send(document))
      .catch(err => res.status(400).send(err));
  },

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
        })
        .then(updatedDocument => res.status(200).send(updatedDocument))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

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
