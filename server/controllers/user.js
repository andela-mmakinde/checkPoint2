import jwt from 'jsonwebtoken';
import { User } from '../models'

const createToken = (user) => {
  return jwt.sign(user, 'secret', { expiresIn: '24h' });
};

module.exports = {
  create(req, res) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        message: 'Email is not rightly formatted'
      });
    }
    if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
      return res.status(401).json({ message: 'Enter all required field' });
    }
    if(req.body.password !== req.body.confirmPassword) {
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
          const jsonToken = createToken({ existingUser });
          res.status(201).send({ message: 'User created', user });
        })
        .catch(err => res.status(400).send(err));
    });
  },

  list(req, res) {
    return User.all()
      .then(user => res.status(200).send(user))
      .catch(err => res.status(400).send(err));
  },

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
        return user
          .update({
            email: req.body.email || user.email,
            password: req.body.password || user.password
          })
          .then(updatedUser => res.status(200).send(updatedUser))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

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
        if (existingUser && existingUser.password === req.body.password) {
          const jsonToken = createToken({ existingUser });
          return res.status(200).send({
            message: 'Logged in!'
          });
        }
        return res.status(401).send({
          message: 'Invalid Password!'
        });
      })
      .catch(error => res.status(400).send(error));
  },

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

  logout(req, res) {
    res.status(200).send({ message: 'Logout successful' });
  }
};
