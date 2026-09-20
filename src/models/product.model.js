const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: 'Product name already exists'
        },
        validate: {
             notEmpty: {
                msg:'Product can not be empty'
            },
            len:{
                args: [2, 100],
                msg: 'Product name must be between 2 and 100 characters'
            }
        }
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Price can not be empty'
            },
            isDecimal: {
                msg: 'Price must be a decimal number'
            },
            min: {
                args: [0],
                msg: 'Price must be greater than or equal to 0'
            },
        }
    }
},{
    tableName: 'product',
    timestamps: true,
    paranoid: true,
})

module.exports = Product


