const jwt = require('jsonwebtoken');
const secretKey = 'yourkey';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Anexe o objeto de usuário ao pedido
    next();
  });
}

module.exports = authenticateToken;
