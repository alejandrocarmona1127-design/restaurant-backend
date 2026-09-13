const sequelize = require('./database.js')
require ('../models/index')

class DatabaseSync {
static async syncData() {
    try {
        await sequelize.authenticate()
            .then(() => {
                console.log('Database connected established successfully.')
             })
            .catch((error) => {
                console.error('Unable to connect to the database:', error)
            })
    }catch (error) {
        console.log('Error syncing data:', error)
        }
    }
}

module.exports = DatabaseSync

