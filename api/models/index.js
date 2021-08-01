'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  // grabs all files in the containing directory, i.e. /models
  .readdirSync(__dirname)
  // filter retains files that are not hidden, are not this file, and are js files
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // calls the function that each model file is exporting, saves return to model variable
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // assigns the model to db object as a property that is the name of the model
    db[model.name] = model;
  });
// calls associate method for each model on db
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
