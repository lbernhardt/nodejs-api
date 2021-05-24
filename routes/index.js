
const express = require('express')
const api = express.Router()
const stickyController = require('../controllers/stickyController')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')


/*User routes*/
api.post('/signUp', userController.signUp)
api.post('/signIn', userController.signIn)

/*Example*/
api.get('/private', auth, function(req, res) {
    res.status(200).send({message: "Tienes acceso"})
})

/*Stickies routes*/
api.get('/stickies', stickyController.getStickies)
api.get('/sticky/:stickyId', stickyController.getSticky)
api.post('/sticky', stickyController.saveSticky)
api.delete('/sticky/:stickyId', auth, stickyController.deleteSticky)
api.put('/sticky/:stickyId', auth, stickyController.updateSticky)

module.exports = api