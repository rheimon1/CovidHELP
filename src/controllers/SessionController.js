const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const Token = require('../auth/token.auth');

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

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response.status(401).json({ error: 'Inválid password' })
    }

    const { id, name, whatsapp, city, uf } = user;

    const now = Math.floor(Date.now() / 1000);

    const jwtData = {
      sub: {
        id: id,
        name: name,
        email: email,
        whatsapp: whatsapp,
        city: city,
        uf: uf,
      },
    };
    

    const token = await Token.generate(jwtData);
    
    return response.status(200).json({ jwtData, token })
  }
}