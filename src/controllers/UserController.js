const bcrypt = require('bcrypt');

const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*');
  
    return response.json(users);
  },

  async create(request, response) {
    let { name, email, password, whatsapp, city, uf } = request.body;

    const encryptPassword = password => {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt)
    }

    password = encryptPassword(password);

    await connection('users').insert({
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
    }).then(_ => response.status(204).send())
  }
}