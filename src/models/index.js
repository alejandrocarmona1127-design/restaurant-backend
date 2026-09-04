const sequelize = require('../config/database')
const User = require('./user.model')
const Product = require('./product.model')
const Sale = require('./sale.model')
const SaleProduct = require('./saleproduct.model')

User.hasMany(Sale, { 
    foreignKey: 'userId',
    as: 'sales',
    onDelete: 'restrict',
    onUpdate: 'cascade'
})


Sale.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

Sale.hasMany(SaleProduct, {
    foreignKey: 'saleId',
    as: 'saleProducts',
    onDelete: 'restrict',
    onUpdate: 'cascade'
})

SaleProduct.belongsTo(Sale, {
    foreignKey: 'saleId',
    as: 'sale'
})

Product.hasMany(SaleProduct, {
    foreignKey: 'productId',
    as: 'saleProducts',
    onDelete: 'restrict',
    onUpdate: 'cascade'
})

SaleProduct.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
})

module.exports = {
    sequelize,
    User,
    Product,
    Sale,
    SaleProduct
}

