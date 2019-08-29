const Tag = require('../models/tag')

class TagController {

    static getAllTags(req, res, next) {
        Tag.find()
            .sort({ count: -1 })
            .then(tags => {
                res.status(201).json(tags)
            })
            .catch(next)
    }
}

module.exports = TagController