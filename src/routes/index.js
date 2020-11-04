const { Router } = require('express');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes')
const postRoutes = require('./post.routes')

const routes = Router();

routes.use('/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/post', postRoutes);

module.exports = routes;
