const {dataTypes} = require('sequelize');
const sequelize = require('../config/database');

const SaleProduct = sequelize.define('SaleProduct', {
    saleProductId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    saleId: {
        type: dataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: dataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: dataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: {
                args: [1],
                msg:'quantity must be a positive number'
            }
        }
    }
},{
    tableName: 'saleproduct',
    timestamps: true,
    paranoid: true
})

module.exports = SaleProduct
