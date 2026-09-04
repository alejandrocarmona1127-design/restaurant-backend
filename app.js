const express = require('express')
const sequelize = require('./src/config/database')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(PORT, () => {
    console.log(`Server is runing at http://localhost:${PORT}`)
})

sequelize.authenticate()
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error)
    })

