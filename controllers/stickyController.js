const Sticky = require('../models/sticky')


function getSticky (req, res) {
    let stickyId = req.params.stickyId

    Sticky.findById(stickyId, (err, sticky) => {
        if (err) return res.status(500).send({message: `Error al recuperar la sticky`})
        if (!sticky) return res.status(404).send({message: `La sticky no existe`})

        res.status(200).send({sticky})
    })
}

function getStickies (req, res) {
    Sticky.find({}, (err, stickies) =>{
        if (err) return res.status(500).send({message: `Error al recuperar las stickies`})
        if (!stickies) return res.status(404).send({message: `No existen stickies`})

        res.send(200, {stickies})
    })
}

function saveSticky (req, res) {
    let sticky = new Sticky();
    sticky.title = req.body.title
    sticky.note = req.body.note
    sticky.user = req.body.user
    sticky.color = req.body.color

    console.log(req.body);

    sticky.save((err, stickyStored) => {
        if(err) res.status(500).send({message: `Error al guardar la sticky ${err}`});

        res.status(200).send({sticky: stickyStored});
    })
}

function updateSticky (req, res) {
    let stickyId = req.params.stickyId
    let update = req.body

    update.lastUpdate = Date.now()

    Sticky.findByIdAndUpdate(stickyId, update, (err, stickyUpdated) => {
        if (err) return res.status(500).send({message: `Error al actualizar la sticky ${err}`})
        
        res.status(200).send({sticky : stickyUpdated})
    })
}

function deleteSticky (req, res) {
    let stickyId = req.params.stickyId

    Sticky.findById(stickyId, (err, sticky) => {
        if (err) return res.status(500).send({message: `Error al recuperar la sticky  ${err}`})
        if (!sticky) return res.status(404).send({message: `La sticky no existe`})

        sticky.remove( (err) => {
           if(err) return res.status(500).send({message: `Error al borrar la sticky: ${err}`})

           res.status(200).send({message : `La sticky fue eliminada.`})
        })
    });
}

module.exports = {
    getSticky,
    getStickies,
    saveSticky,
    updateSticky,
    deleteSticky
}