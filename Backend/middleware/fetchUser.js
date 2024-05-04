const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Gautamisagoodb$oy';

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: 'TPlease authenticate using a valid token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchuser;
