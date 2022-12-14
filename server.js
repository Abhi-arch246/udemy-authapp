const express = require('express')
const connectDb = require('./config/db')
const authRoute = require('./routes/authRoute')
const path = require('path')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


connectDb()
app.use(express.json())
app.use('/auth', authRoute)


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

app.listen(port, () => console.log(`Server started on port ${port}`))