const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const SaleProduct = sequelize.define('SaleProduct', {
    saleProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
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
