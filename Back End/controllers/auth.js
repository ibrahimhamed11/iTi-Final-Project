const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../Models/Users');
const cookieParser = require('cookie-parser');

function authMiddleware(req, res, next) {

  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
