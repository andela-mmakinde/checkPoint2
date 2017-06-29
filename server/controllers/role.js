import { Role, User } from '../models/';

export default {
  /**
   * Creates a new role for user
   * Route: POST: /role
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  create(req, res) {
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send({
        message: 'Role created succesfully', role
      }))
      .catch(error => res.status(400).send({
        message: 'Error creating new role', error
      }));
  },
};

