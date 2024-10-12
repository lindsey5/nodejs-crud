const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('student_info_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize