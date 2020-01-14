const express = require('express');

const DevsController = require('../controllers/DevsController')
const SearchController = require('../controllers/SearchController')

const routes = express.Router();

routes.get('/search', SearchController.index);

routes.get('/', DevsController.index);
routes.get('/:id', DevsController.show);
routes.post('/', DevsController.store);
routes.put('/:id', DevsController.update);
routes.delete('/:id', DevsController.destroy);

module.exports = app => app.use('/devs', routes);