import { Model, UUIDV4 } from 'sequelize';
  
interface ItemAttributes {
    item_id: string;
    title: string;
    price: number;
    is_amazon_choice: boolean;
    rating: number;
    rating_count: number;
    is_prime: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Item extends Model<ItemAttributes> implements ItemAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        item_id!: string;
        title!: string;
        price!: number;
        is_amazon_choice!: boolean;
        rating!: number;
        rating_count!: number;
        is_prime!: boolean;

        static associate(models: any) {
        // define association here
        Item.belongsTo(models.User, {
            foreignKey: "user_id",
        })
        }
    };
    Item.init({
        item_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        is_amazon_choice: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating_count: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        is_prime: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Item',
    });
    return Item;
};