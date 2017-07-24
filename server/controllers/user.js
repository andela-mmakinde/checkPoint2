import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import { User } from '../models';

const createToken = user => jwt.sign(user, 'secret', { expiresIn: '24h' });
const Users = {
  /**
   * Creates a new user
   * Route: POST: /users
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  create(req, res) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.fullName) {
      return res.status(401).json({ message: 'Enter all required field' });
    }
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        message: 'Email is not rightly formatted'
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({ message: 'Password doesn\'t match' });
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((existingUser) => {
      if (existingUser !== null) {
        return res.status(409).send({
          message: 'A user with this email already exists!'
        });
      }
      return User.create({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        roleId: req.body.roleId
      })
        .then((user) => {
          const userDetails = {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
            fullName: user.fullName
          };
          const jsonToken = createToken({ userDetails });
          res.status(201).send({ message: 'User created', jsonToken });
        })
        .catch(err => res.status(400).send(err));
    });
  },

  /**
   * List all users in the database
   * Route: GET: /users
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  list(req, res) {
    return User
      .findAndCountAll({
        where: {
          roleId: {
            $ne: 1
          }
        },
        attributes: { exclude: ['password'] },
        limit: req.query.limit || 5,
        offset: req.query.offset || 0,
      }).then((user) => {
        const limit = req.query.limit || 5;
        const offset = req.query.offset || 0;
        const total = user.count;
        const pageCount = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const pageSize = total - offset > limit ? limit : total - offset;
        res.status(200).send({
          user: user.rows,
          pagination: {
            total,
            pageCount,
            currentPage,
            pageSize
          }
        });
      })
        .catch(err => res.status(400).send(err));
  },

  /**
   * Updates details of user in the database
   * Route: PUT: /users/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  update(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((user) => {
        let password;
        if (!user || user === null) {
          return res.status(404).send({
            message: 'user Not Found'
          });
        }
        if (req.user.id === user.id || user.id === 1) {
          const salt = bcrypt.genSaltSync(10);
          if (req.body.password) {
            password = bcrypt.hashSync(req.body.password, salt);
          }
          if (req.body.email !== req.user.email) {
            User.findOne({
              where: { email: { $iLike: `%${req.body.email}%` } },
            }).then((existingUser) => {
              if (existingUser !== null) {
                res.status(409).send({ message: 'Another user with this email already exist' });
              }
            });
          }
          const fieldsToUpdate = {
            password: password || user.password,
            email: req.body.email || user.email,
            fullName: req.body.fullName || user.fullName
          };
          return user
            .update(fieldsToUpdate)
            .then((updatedUser) => {
              const userDetails = {
                email: updatedUser.email,
                id: updatedUser.id,
                roleId: updatedUser.roleId,
                fullName: updatedUser.fullName
              };
              const jsonToken = createToken({ userDetails });
              res.status(201).send({ message: 'User updated', jsonToken });
            })
            .catch(error => res.status(400).send(error));
        }
      })
        .catch(error => res.status(400).send(error));
  },

  /**
   * Logs a user in to the app
   * Route: POST: /users/login
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).json({ message: 'Enter all required field' });
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((existingUser) => {
        if (!existingUser || existingUser === null) {
          return res.status(404).send({
            message: 'User record not found!'
          });
        }
        if (existingUser.verifyPassword(existingUser.password, req.body.password)) {
          const userDetails = {
            id: existingUser.id,
            email: existingUser.email,
            roleId: existingUser.roleId,
            fullName: existingUser.fullName
          };
          const jsonToken = createToken({ userDetails });
          return res.status(200).send({
            message: 'Logged in!', jsonToken
          });
        }
        return res.status(401).send({
          message: 'Invalid Password!'
        });
      })
      .catch(error => res.status(400).send({ message: 'Error', error }));
  },

    /**
   * Retrieves a user in the database by the id
   * Route: GET: /users/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  retrieveOne(req, res) {
    return User
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: { exclude: ['password'] }
      })
      .then((user) => {
        if (!user || user === null) {
          return res
            .status(404)
            .send({ message: 'User not found!' });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(404).send(error));
  },

  /**
   * Deletes specified user from the database
   * Route: DELETE: /users/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  delete(req, res) {
    return User.find({
      where: {
        id: req.params.id,
        roleId: {
          $ne: 1
        }
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return user
          .destroy()
          .then(() =>
            res
              .status(201)
              .send({ message: 'User details deleted successfully' })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Searches for users in the database
   * Route: GET: /search/users
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  search(req, res) {
    const search = req.query.q;
    User.findAndCountAll({
      where: { email: { $iLike: `%${search}%` }, roleId: { $ne: 1 } },
      attributes: { exclude: ['password'] },
      limit: req.query.limit || 5,
      offset: req.query.offset || 0,
    })
      .then((user) => {
        // if (user.count === 0) {
        //   return res.status(404).json({
        //     message: 'Sorry, No User found'
        //   });
        // }
        const limit = req.query.limit || 5;
        const offset = req.query.offset || 0;
        const total = user.count;
        const pageCount = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const pageSize = total - offset > limit ? limit : total - offset;
        res.status(200).send({
          user: user.rows,
          pagination: {
            total,
            pageCount,
            currentPage,
            pageSize
          }
        });
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Logs a user out of the app
   * Route: POST: /users/logout
   *
   * @param {any} req
   * @param {any} res
   * @returns {Response} response object
   */
  logout(req, res) {
    res.status(200).send({ message: 'Logout successful' });
  }
};

export default Users;

