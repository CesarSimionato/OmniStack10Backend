const express = require('express');

const AuthController = require('../controllers/AuthController')
const DevsController = require('../controllers/DevsController')

const routes = express.Router();

routes.get('/', AuthController.store);
routes.post('/', DevsController.store);

module.exports = app => app.use('/auth', routes);