const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const user_id = request.headers['user_id'];

    const incidents = await connection('incidents')
      .where('user_id', user_id)
      .select('*')

    return response.json(incidents);
  }
}