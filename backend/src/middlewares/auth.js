require('dotenv/config');

const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).json({ error: 'Token not provided' });

  const [, token] = authHeader.split(' ');

  try {
    const payload = jwt.verify(token, process.env.APP_SECRET);

    request.userId = payload.userId;

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token'});
  }
}