const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Pokud není token, vrátí 401 Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Pokud je token neplatný, vrátí 403 Forbidden
    req.user = user;
    next(); // Pokračuje na další middleware nebo routu
  });
};

module.exports = authenticateToken;
