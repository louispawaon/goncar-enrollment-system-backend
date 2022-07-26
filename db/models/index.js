import config from 'db/config/config.js';


'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

//connect sequelize to DB
let sequelize = new Sequelize(
  config[env].database,
  config[env].user,
  config[env].password,
  config[env]
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    db[modelName].associate(db);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
  
export default db;

import db from '../db/models';

db.sequelize // connects db object to the server
  .sync({ force: false })
  .then(() => {
    console.log('✅ DB Connected!');
  })
  .catch((err) => {
    console.error(err);
  });