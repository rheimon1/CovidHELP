const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await connection('users')
      .where('email', email)
      .select('name')
      .first();
    
    if(!user)
      return response.status(400).json({ error: 'No User found with this ID' });
  
    return response.json(user);
  }
}