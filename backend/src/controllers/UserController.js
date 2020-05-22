const connection = require('../database/connection');

const encryptPassword = require('../utils/encryptPassword')

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*');
  
    return response.json(users);
  },

  async create(request, response) {
    let { name, email, password, whatsapp, city, uf } = request.body;

    let {password} = encryptPassword(realPassword);

    await connection('users').insert({
      name,
      email,
      password,
      whatsapp,
      city,
      uf
    }).then(_ => response.status(204).send())
  }
}