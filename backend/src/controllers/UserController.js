const connection = require('../database/connection');

const encryptPassword = require('../utils/encryptPassword')
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*');
  
    return response.json(users);
  },

  async create(request, response) {
    let { name, email, password, confirmPassword, whatsapp, city, uf } = request.body;

    if(password != confirmPassword) {
      return response.status(401).json({ error: 'Passwords not match' });
    }

    const userFromDb = await connection('users')
      .where('email', email)
      .first()

    if(userFromDb) {
      return response.status(401).json({ error: 'User already registered!' })
    }

    data = encryptPassword(password);
    password = data.password

    const id = generateUniqueId();

    await connection('users').insert({
      id,
      name,
      email,
      password,
      whatsapp,
      city,
      uf
    }).then(_ => response.status(204).send())
  }
}