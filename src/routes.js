const express = require('express');

const UserController = require('./controllers/UserController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile/', ProfileController.index);

routes.post('/session', SessionController.create);
routes.use(authMiddleware);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;