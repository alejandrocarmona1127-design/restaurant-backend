const { product, Product } = require('../models')

class ProductService{

    static async getAllProducts(){
        return await Product.findAll({
            order: [['name', 'ASC']]
        })
    }

    static async getProductById(id){
        const product = await Product.findByPk(id)

        if(!product){
            throw new Error('Product not found')
        }

        return product
    }

    static async createProduct(productData){
        const {name, description, price} = productData
        const existingProduct = await Product.findOne({where: [name]})

        if (existingProduct){
            throw new Error('Product already exists')
        }

        const product =await Product.create({
            name,
            description,
            price
        })

        const createProduct = product.toJSON()
        return createProduct
    }

    static async updateProduct(id, productData){
        const product = await Product.findByPk(id)

        if(!product){
            throw new Error('Product not found')
        }

        const { name, description, price } = productData

        if(name){
            const existingName = await Product.findOne({ where: {email, productId: {[Op.ne]: id}}})
            if(existingName){
                throw new Error('Product name already exists')
            }
        }

        if(price < 0){
            throw new Error('Product name can not be 0')
        }

                
        await product.update(productData)

        const updatedProduct = product.toJSON()
        return updatedProduct        
    }

    static async deleteProduct(id){
        const product = await Product.findByPk(id)

        if(!product){
            throw new Error('product not found')
        }

        await product.destroy()

        return {message: 'Product delete successfully'}
    }

}

module.export = ProductService