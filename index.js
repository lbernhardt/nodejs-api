
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => { 
    if(err) throw err;
    console.log('Conexion con la db mongo establecida.')

    app.listen(config.port, () => {
        console.log(`listen on port ${config.port}`)
    })
});