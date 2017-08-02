import jwt from 'jsonwebtoken';

/**
 *
 * @class Authorisation
 */
class Authorisation {

  /**
   * Checks if user is authenticated
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {object} response object
   *
   * @memberOf middleware
   */
  static checkToken(req, res, next) {
    const token = req.body.token
    || req.query.token
    || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'secret', (error, decoded) => {
        if (error) {
          return res.status(403).json({
            message: 'Failed to authenticate token.'
          });
        }
        req.user = decoded.userDetails;
        next();
      });
    } else {
      return res.status(200).json({
        message: 'No token provided.'
      });
    }
  }

/**
 * Checks if user is an Admin or not
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {object} response object
 *
 * @memberOf middleware
 */
  static isAdmin(req, res, next) {
    if (req.user.roleId === 1) {
      next();
    } else {
      return res
        .status(401)
        .json({ message: 'Unauthorised access' });
    }
  }
}

export default Authorisation;
