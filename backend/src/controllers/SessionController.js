const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;

    if(!email || !password) {
      return response.status(400).json({ error: 'Email or Password not posted' });
    }

    const userFromDb = await connection('users')
      .where('email', email)
      .first();
    
    if(!userFromDb) {
      return response.status(400).json({ error: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, userFromDb.password);

    if (!isPasswordMatch) return response.status(401).json({ error: 'Wrong password' });

    let user = {
      id: userFromDb.id,
      name: userFromDb.name,
      email: userFromDb.email,
    };

    return response.status(200).json({
      user, 
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
        expiresIn: '1h',
      }),
    });
  },
}