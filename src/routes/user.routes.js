const { Router } = require('express');

const routes = Router();

const middleware = require('../middlewares');

const userController = require('../controllers/userController');

routes.use(middleware);

routes.get('/', userController.index);
routes.get('/:user_id', userController.GetById);
routes.put('/changepwd', userController.changePassword);

module.exports = routes;
