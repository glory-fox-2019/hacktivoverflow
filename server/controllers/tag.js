const Tag = require('../models/tag')

class TagController {
    static create(req, res, next) {
        const { name } = req.body

        Tag.create({ name })
            .then( tag => {
                res.status(201).json(tag)
            })
            .catch(next)
    }
    
    static findAll(req, res, next) {
        Tag.find()
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteOne(req, res, next) {
        const id = req.params.tagId

        Tag.findByIdAndDelete(id)
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TagController