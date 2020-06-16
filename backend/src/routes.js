const express = require('express');

const UserController = require('./controllers/UserController');
const OrdersController = require('./controllers/OrdersController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const validation = require('./utils/validation');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/session', validation.sessionCreate, SessionController.create);
routes.post('/users', validation.usersCreate, UserController.create);
routes.get('/orders', validation.ordersIndex, OrdersController.index);

routes.use(authMiddleware);

routes.get('/profile/', validation.profile, ProfileController.index);
routes.post('/orders', validation.ordersCreate, OrdersController.create);
routes.delete('/orders/:id', validation.ordersDelete, OrdersController.delete);

module.exports = routes;