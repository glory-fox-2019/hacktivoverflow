const Tag = require('../models/tag')

module.exports = (req, res, next) => {
    if(!req.body.tags){
        next()
    }


    const tags = req.body.tags.split(',')

    async function createTags(tags) {
        let newNameTags = []
        let oldTags = []


        for(let i = 0; i < tags.length; i++){
            let name = tags[i]
            let tag = await Tag.findOne({ name })
            
            if(!tag) {
                newNameTags.push({ name })
            } else {
                oldTags.push(tag)
            }
        }

        if(newNameTags.length > 0){
            Tag.create(newNameTags)
                .then( newTags => {
                    let allTags = oldTags.concat(newTags)
                    let idTags = []
    
                    allTags.forEach( t => {
                        idTags.push(`${t._id}`)
                    });
                    
                    req.body.tags = idTags
                    next()
                })
                .catch(next)
        } else {
            let allTags = oldTags
            let idTags = []

            allTags.forEach( t => {
                idTags.push(`${t._id}`)
            });
            
            req.body.tags = idTags
            next()
        }
    }

    createTags(tags)
    
}