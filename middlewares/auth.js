
const service = require('../service')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({messaje : `No authorization request`})
    }

    const token = req.headers.authorization.split(" ")[1]
    
    service.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            return res.status(response.status).send({messaje : response.message})   
        })
}

module.exports = isAuth