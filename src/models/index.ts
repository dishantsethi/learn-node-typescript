const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/db.js`)[env];

const db: any = {};

let sequelize = config.use_env_variable ? new Sequelize(process.env[config.use_env_variable], config) : new Sequelize(config.database, config.username, config.password, config);


fs.readdirSync(__dirname)
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename;
    })
    .forEach((file: any) => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const model = require(path.join(__dirname, file))( sequelize, Sequelize.DataTypes );
        db[model.name] = model;
        });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;