'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a first name'
        },
        notNull: {
          msg: 'Please provide a first name'
        }
      }
    },
    lastName : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a last name'
        },
        notNull: {
          msg: 'Please enter a last name'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: {
        msg: 'The email address entered already exists'
      },
      allowNull: false,
      validate:{
        notNull: {
          msg: 'An email address is required'
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val){
        const hashedPassword = bcrypt.hashSync(val, 10)
        this.setDataValue('password', hashedPassword)
      },
      validate: {
        notNull: {
          msg: 'A password is required'
        },
          notEmpty: {
            msg: 'Please provide a password'
          }
      },
      len: {
        args: [10, 30],
        msg: 'The password length should be between 10 and 30 characters'
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Course, {foreignKey: 'userId'});
  };
  return User;
};
