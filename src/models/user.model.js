const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idNumber:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Identification number can not be null'
            },
            len:{
                args: [8, 15],
                msg: 'Identification number must be between 8 and 15 characters'
            }
        }
    },
    name:{
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg:'Name can not be empty'
            },
            len:{
                args: [1, 60],
                msg: 'Name must be between 1 and 60 characters'
            }
        }
    },
    lastName:{
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg:'Name can not be empty'
            },
            len:{
                args: [1, 60],
                msg: 'Name must be between 1 and 60 characters'
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msg: 'Email already exists'
        },
        validate: {
            isEmail: true,
            isEmail: {
                msg: 'Email format is invalid'
            },
            notEmpty: {
                msg:'Email can not be empty'
            },
            len:{
                args: [5, 100],
                msg: 'Email must be between 1 and 60 characters'
            }
        }
    },
    password:{  
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg:'Password can not be empty'
            },
            len:{
                args: [8, 15],
                msg: 'Password must be at least 8 characters long'
            },
            isStrongPassword(value) {
                const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
                if (!strongPasswordRegex.test(value)) 
                    throw new Error('Password must contain at least one letter, one number, and one special character')
            }
        }
    }
}, {
    tableName: 'User',
    timestamps: true,
    paranoid: true,
})
module.exports = User