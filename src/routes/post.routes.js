const { Router } = require('express');

const routes = Router();

const middleware = require('../middlewares')

const postController = require('../controllers/postController');

routes.use(middleware);

routes.get('/', postController.getAll);
routes.post('/', postController.create);
routes.delete('/:post_id', postController.delete);

module.exports = routes;
