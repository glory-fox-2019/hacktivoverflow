const { question , tag } = require('../model')
class question_controller {
    
    static getAll (req,res,next) {
        question.find({}).populate('User').populate('Answer').populate('tags')
        .then(data=>{
            console.log(data)
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static createQuestion (req,res,next) {
        let {title ,  description , tags } = req.body
        let tempP = []
        let kondisi;
        console.log(tags)
        if(tags.length == 0){
            question.create({
                title , description ,  tags : [] , User : req.decode.data
            })
            .then(data3=>{
                res.json(data3)
            })
            .catch(err=>{
                next(err)
            })
        }else {
            tags.forEach((el,index)=>{
             tag.findOne({
                   name : el
               })
               .then(data1=>{
                   if(data1){
                       kondisi = false
                       tempP.push(data1._id)
                   }else {
                       kondisi = true
                        return tag.create({
                            name : el
                        })
                   }
               })
               .then(data2=>{
                   if(kondisi){
                       tempP.push(data2._id)
                   }
                   if(index == tags.length -1){
                       console.log(tempP)
                       console.log(index , tags.length -1)
                       console.log(req.decode.data , ' ini isi')
                       console.log(req.decode.data._id , ' ini id nya')
                       question.create({
                           title , description ,  tags : tempP , User : req.decode.data
                       })
                       .then(data3=>{
                           res.json(data3)
                       })
                       .catch(err=>{
                           next(err)
                       })
                   }
               })
               .catch(err2=>{
                   next(err2)
               })
            })
        }
    }

    static detailQuestion (req,res,next){
        question.findById(req.params.id).populate('User').populate('Answer').populate('tags')
        .then(data=>{
            console.log(data.Answer)
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static filterByTag(req,res,next){
        let temp = []
        let count = 0
        console.log(req.query.tag)
        question.find({}).populate('tags')
        .then(data=>{
            let p = data.forEach((el,index)=>{
                el.tags.forEach((al,index2)=>{
                    let str = al.name.split('')
                    str.pop()
                    console.log( str ,  str.join('') == req.query.tag)
                    if(str.join('') == req.query.tag){
                        console.log(req.query.tag ,  al.name , ' ini')
                        temp.push(el)
                    }
                    if(index == data.length -1 ){
                        res.json({arr : temp})
                    }
                })
            })
            return Promise.all([p])
        })
        .then(hasil=>{
            console.log(temp)
            res.json({
                arr: temp
            })
        })
    }

    static editQuestion (req,res,next){
        let {title ,  description} = req.body
        question.updateOne({
            _id : req.params.id
        },{
            title ,  description
        })
        .then(hasil=>{
            res.json(hasil)
        })
        .catch(next)
    }

    static deleteQuestion (req,res,next){
        question.deleteOne({
            _id : req.params.id
        })
        .then(hasil=>{
            res.json(hasil)
        })
        .catch(next)
    }
}

module.exports = question_controller