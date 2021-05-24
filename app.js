const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const api = require('./routes')
const config = require('./config')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


app.use(cors(config.application.cors.server));

app.use('/api', api)

app.get('/', (req, res) => {
    res.send("hola! Te invito a que consumas de mi Api!")
});


module.exports = app