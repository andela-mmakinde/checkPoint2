import { Role } from '../models/';

const Roles = {
  /**
   * Creates a new role for user
   * Route: POST: /role
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  create(req, res) {
    if (!req.body.title) {
      return res
        .status(401)
        .json({ message: 'This field is required' });
    }
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201)
      .send({ message: 'Role created succesfully', role }))
      .catch(error => res.status(400)
      .send({ message: 'Error creating new role', error }));
  },

   /**
   * Finds matching instance of a role
   * Route: GET: /roles:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  findOne(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
      }).catch(error => res.status(400).json(error));
  },

   /**
   * Lists out all available roles in the database
   * Route: GET: /roles
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  getAll(req, res) {
    return Role
      .findAll()
      .then(roles => res.status(200).json(roles))
      .catch(error => res.json(error));
  },

   /**
   * Updates roles existing in the database
   * Route: PUT: /roles/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  update(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({ message: 'Role not found' });
        }
        return role
          .update({ title: req.body.title || role.title })
          .then(() => res.status(200)
          .json({ message: 'Role updated successfully', role }))
          .catch(error => res.status(400).json(error));
      }).catch(error => res.status(400).json(error));
  },

   /**
   * Deletes a role for the database
   * Route: DELETE: /roles/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  delete(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({ message: 'Role not found' });
        }
        return role
            .destroy()
            .then(() => res.status(200)
            .json({ message: 'Role has been deleted successfully' }))
            .catch(error => res.status(400).send(error));
      }).catch(error => res.json(error));
  },
};
export default Roles;

