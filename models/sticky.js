const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StickySchemma = new Schema({
    title : String,
    note : String,
    user : String,
    createdDate : { type: Date, default: Date.now() },
    lastUpdate : { type: Date, default: Date.now() },
    color : String
})

module.exports = mongoose.model('Sticky', StickySchemma);
