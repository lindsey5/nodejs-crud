const DataTypes  = require('sequelize');
const sequelize = require('../config/connection');

const Student = sequelize.define('Students', {
  student_id: {
    type: DataTypes.STRING,
    primaryKey: true
  }, 
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
}

);

module.exports = Student;