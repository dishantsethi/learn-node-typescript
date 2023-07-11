import {
  Model, UUIDV4
} from 'sequelize';
import db from '.'

interface UserAttributes {
  user_id: string;
  username: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    user_id!: string;
    username!: string;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Item,{
        foreignKey: "user_id",
      })
    }
  };
  User.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};