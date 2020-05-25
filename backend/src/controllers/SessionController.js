const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;

    if(!email || !password) {
      return response.status(400).json({ error: 'Email or Password not posted' });
    }

    const user = await connection('users')
      .where('email', email)
      .first();
    
    if(!user) {
      return response.status(400).json({ error: 'No User found' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ error: 'Invalid password' })
    }

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      whatsapp: user.whatsapp,
      city: user.city,
      uf: user.uf,
      iat: now,
      exp: now + (60 * 30),
    };

    return response.status(200).json({ 
      ...payload, 
      token: jwt.encode(payload, process.env.authSecret) 
    });
  },

  async validateToken(request, response) {
    const userData = request.body || null

    try {
      if(userData) {

        const token = jwt.decode(userData, authSecret);
        if(new Date(token.exp * 1000) > new Date()) {
          const payload = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            whatsapp: userData.whatsapp,
            city: userData.city,
            uf: userData.uf,
            iat: now,
            exp: now + (60 * 30),
          };
          
          return response.status(200).json({
            token: jwt.encode(payload, process.env.authSecret)
          })
        }
      }
    } catch(err) {
        return response.json({ error: 'Invalid Token' });
    }
  }
}