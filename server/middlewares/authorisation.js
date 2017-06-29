import jwt from 'jsonwebtoken';

/**
 * Checks if user is authenticated
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {object} response object
 */
const checkToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'secret', (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: 'Failed to authenticate token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(200).json({
      message: 'No token provided.'
    });
  }
};

export default checkToken;
