const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize){
    super.init({
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associete(models){
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Post;
