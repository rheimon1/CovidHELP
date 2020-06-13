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

    const user = await connection('users')
      .where('email', email)
      .first();
    
    if(!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) return response.status(401).json({ error: 'Wrong password' });

    return response.status(200).json({ 
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
        expiresIn: '1h',
      }),
    });
  },
}