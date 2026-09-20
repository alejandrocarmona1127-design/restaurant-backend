const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Sale = sequelize.define('Sale', {
    saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Sale date must be a valid date'
            }

        }
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            min: {
                args: [0.00],
                msg: 'Total amount must be greater than or equal to 0.00'
            }
        }
    }
},{
    tableName: 'sale',
    timestamps: true,
    paranoid: true,
       
})

module.exports = Sale
