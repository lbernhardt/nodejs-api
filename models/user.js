const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    singUpDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

//pre es una funcion de mongoose que se ejecuta antes del metodo que nosotros indicamos, en este caso save
UserSchema.pre('save', function (next) {   //ver middleware (next)
    let user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    });
}

UserSchema.methods.gravatar = function(size) {
    if(!size){
        size = 200;
    }

    if(!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`
    
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

module.exports = mongoose.model('User', UserSchema);