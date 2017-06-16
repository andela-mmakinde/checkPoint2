import { Role, User } from '../models/';

export default {
  create(req, res) {
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send({
        message: 'Role created succesfully', role
      }))
      .catch(error => res.status(400).send({
        message: 'Error creating new role' , error
      }));
  },
}

