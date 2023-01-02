const jwt = require('jsonwebtoken');

const validation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'INVALID_USER' });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.data = user.userId;
  next();
};

module.exports = {
  validation,
};
