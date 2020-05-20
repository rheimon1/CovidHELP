const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    //const user_id = request.headers['authorization'];
    const dataUser = response.getHeader('x-access');
    
    const user = dataUser.sub;

    const incidents = await connection('incidents')
      .where('user_id', user.id)
      .select('*')

    return response.json(incidents);
  }
}