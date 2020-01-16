const express = require('express');

const authMiddleware = require('../middlewares/auth');

const DevsController = require('../controllers/DevsController')
const SearchController = require('../controllers/SearchController')

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/search', SearchController.index);

routes.get('/', DevsController.index);
routes.get('/:id', DevsController.show);
routes.put('/:id', DevsController.update);
routes.delete('/:id', DevsController.destroy);

module.exports = app => app.use('/devs', routes);