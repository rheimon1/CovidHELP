const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (request, response, next) => {
  const authHeader = request.headers['authorization'];

  const token = authHeader.split(' ')[0];

  if (token == null) {
    return response.status(401).send({ error: "No token provided" });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    response.setHeader('x-access', decoded);

    return next();
  } catch (err) {
    return response.status(401).send({ error: "Token invalid" });
  }
};