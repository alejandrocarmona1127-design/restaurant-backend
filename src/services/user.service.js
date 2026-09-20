const {User } = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

class UserService {

    static async getAllUsers() {
        return await User.findAll({
            attributes: { exclude: ['password']},
            order: [['name', 'ASC']]
        })
    }

    static async getUserById(id) {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        })

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    static async createUser(userData) {
        const { idNumber, name, lastName, email } = userData
        const existingUser = await User.findOne({ where: {email}})

        if (existingUser) {
            throw new Error('Email already exists')
        }

        const hashedpassword = await bcrypt.hash(userData.password, 10)
        const newUser = await User.create({
            idNumber,
            name,
            lastName,
            email,
            password: hashedpassword
        })

        const createdUser = user.toJSON()
        delete createdUser.password

        return createdUser
    }

    static async updateUser(id, userData) {
        const user = await User.findByPk(id)

        if (!user) {
            throw new Error('User not found')
        }

        const { idNumber, name, lastName, email, password } = userData
        
        if(idNumber){
            const existingUser = await User.findOne({ where: { idNumber } })
            if (existingUser){
                throw new Error('Identification number already exists');

            }
        }

        if(email){
            const existingEmail = await User.findOne({ where: {email, userId: {[Op.ne]: id}}})
            if(existingEmail){
                throw new Error('Email already exists')
            }

        }

        const updateData = { idNumber, name, lastName, email}

        if(password){
            const hashedpassword = await bcrypt.hash(password, 10)
            updateData.password = hashedpassword

        }

        await user.update(updateData)

        const updateUser = user.toJSON
        delete updateData.password

        return updateUser


    }

    static async deleteUser(id){
        const user = await User.findByPk(id)

        if(!user){
            throw new Error('User not found')
        }
        
        await user.destroy()

        return {message: 'User delete succefully'}
    }

    static async login(email, pasword){
        const user = await User.findOne({where: {email}})

        if(!user){
            throw new Error('Invalid email or password')
        }

        const isMatch = await bcrypt.compare(pasword, user.password);
        if(!isMatch){
            throw new Error('Invalid email or password')
        }

        const loginUser = user.toJSON
        delete user.password

        return user
    }

}

module.exports = UserService
