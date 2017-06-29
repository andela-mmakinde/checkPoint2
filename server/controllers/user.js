import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';

const createToken = user => jwt.sign(user, 'secret', { expiresIn: '24h' });

/**
 * Get the pagination metaData
 *
 * @export
 * @param {Number} count total result
 * @param {Number} limit limit per page
 * @param {Number} offset the offset
 * @returns {Object} pagination metaData
 */
const paginate = (count, limit, offset) => {
  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = (count - offset) > limit ? limit : (count - offset);

  return {
    page,
    pageCount,
    pageSize,
    totalCount: count
  };
};

module.exports = {
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
    if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
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
        password: req.body.password
      })
        .then((user) => {
          const newUser = {
            id: user.id,
            email: user.email,
            roleId: user.roleId
          };
          const jsonToken = createToken({ newUser });
          res.status(201).send({ message: 'User created', user, jsonToken });
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
    return User.all()
      .then(user => res.status(200).send(user))
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
    return User.find({
      where: {
        id: req.params.id
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found'
          });
        }
        // if (user !== null) {
        //   return res.status(409).send({
        //     message: 'A user with this email already exists!'
        //   });
        // }
        const salt = bcrypt.genSaltSync(10);
        let password;
        if (!user.verifyPassword(user.password, req.body.password)) {
          password = bcrypt.hashSync(req.body.password, salt);
        }
        return user
          .update({
            email: req.body.email || user.email,
            password: password || user.password
          })
          .then(updatedUser => res.status(200).send(updatedUser))
          .catch(error => res.status(400).send(error));
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
            roleId: existingUser.roleId
          };
          const jsonToken = createToken({ userDetails });
          return res.status(200).send({
            message: 'Logged in!', jsonToken, existingUser
          });
        }
        return res.status(401).send({
          message: 'Invalid Password!'
        });
      });
      // .catch(error => res.status(400).send({message: 'Error', error}));
  },

  /**
   * Deletes specified user from the database
   * Route: DELETE: /users/:id
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} response object
   */
  deleteRecord(req, res) {
    return User.find({
      where: {
        id: req.params.id
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
    User.findAll({
      where: { email: { $iLike: `%${search}%` } },
    })
      .then((users) => {
        if (users.length === 0) {
          return res.status(404).json({
            message: 'Sorry, No User found'
          });
        }
        res.status(200).send({ message: 'Found', users });
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
