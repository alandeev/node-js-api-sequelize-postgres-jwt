const { Sequelize } = require('sequelize');

const User = require('../models/User');
const Post = require('../models/Post');

const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

User.init(connection);
Post.init(connection);

//Associando o Model User ao Post
Post.associete(connection.models);
User.associate(connection.models);

module.exports = connection;
