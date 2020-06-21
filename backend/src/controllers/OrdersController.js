const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('orders').count();

    const orders = await connection('orders')
    .join('users', 'users.id', '=', 'orders.user_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'orders.id', 
      'orders.title', 
      'orders.description', 
      'users.name', 
      'users.email', 
      'users.whatsapp', 
      'users.city', 
      'users.uf'
    ]);

    response.header('X-Total-Count', count['count(*)']-1);

    return response.json(orders);
  },

   async create(request, response) {
    const { title, description } = request.body;

    const user_id = request.headers['user_id'];

    const user = await connection('users')
      .where('id', user_id)
      .first()

    if(!user) { 
      return response.status(400).json({
        error: "Id not valid"
      });
    }

     await connection('orders').insert({
        title,
        description,
        user_id,
     }).then(result => response.status(204).json(result));
   },
 
   async delete(request, response) {
    const { id } = request.params;
     
    const user_id = request.headers['user_id'];

    const user = await connection('users')
     .where('id', user_id)
     .first()

    if(!user) { 
      return response.status(400).json({
        error: "Id not valid"
      });
    }

    await connection('orders').where('id', id).delete();

    return response.status(204).send();
   },

   async update(request, response) {
    const { id } = request.params;
     
    const user_id = request.headers['user_id'];

    const user = await connection('users')
     .where('id', user_id)
     .first()

    if(!user) { 
      return response.status(400).json({
        error: "Id not valid"
      });
    }

    await connection('orders').where('id', id).update(request.body);

    return response.status(204).json({ });
   }
 };