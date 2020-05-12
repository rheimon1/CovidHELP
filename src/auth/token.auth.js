const jwt = require('jsonwebtoken');

const generate = payload => (
  new Promise(resolve => {
    jwt.sign(payload, process.env.APP_SECRET, { algorithm: 'HS256' }, function(err, token) {
      if (err) {
        return response.json({ error: 'Invalid Token!'});
      }
    
      resolve(token);
    })
  })
);


module.exports = {
  generate
}