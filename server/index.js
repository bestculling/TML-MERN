const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const users = require('./controllers/user.controller')

const PORT = 8081 || process.env.PORT
const MONGODB_URI = config.mogodburi
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/api/users', users)

app.use(express.static(path.join(path.dirname(__dirname), 'client/build')))


mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/Data', { useNewUrlParser: true }).then(
    () => console.log(`Connect database success`),
    err => console.log(`Connect database fail: ${err}`)
)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
