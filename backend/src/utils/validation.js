const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

  sessionCreate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }),

  usersCreate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      confirmPassword: Joi.string().required().min(6),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    })
  }),
  
  profile: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
      user_id: Joi.string().required()
    }).unknown(),
  }),

  ordersIndex: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),

  ordersCreate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
      user_id: Joi.string().required(),
    }).unknown(),
  }),

  ordersDelete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
      user_id: Joi.string().required(),
    }).unknown(),
  })
}

