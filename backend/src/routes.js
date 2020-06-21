const express = require('express');

const UserController = require('./controllers/UserController');
const OrdersController = require('./controllers/OrdersController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const validation = require('./utils/validation');

const routes = express.Router();

routes.post('/session', validation.sessionCreate, SessionController.create);
routes.get('/orders', validation.ordersIndex, OrdersController.index);


routes.get('/users', UserController.index);
routes.post('/users', validation.usersCreate, UserController.create);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.use(authMiddleware);

routes.get('/profile', validation.profile, ProfileController.index);
routes.post('/orders', validation.ordersCreate, OrdersController.create);
routes.delete('/orders', validation.ordersDelete, OrdersController.delete);
routes.put('/orders', OrdersController.update);

module.exports = routes;