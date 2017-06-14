import jwt from 'jsonwebtoken';

exports.checkToken = (req, res, next) => {
  const token = req.cookies.token;
  // decoding the token
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: 'Failed to authenticate token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token available return a message
    return res.status(200).send({
      message: 'No token returned.'
    });
  }
};