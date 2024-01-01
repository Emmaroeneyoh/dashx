const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   email: {
        type:String, //string or text
        
    },
   code: {
        type:String,
        
    },
    code_used: {
        type:Boolean , default : false
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const dispatch_emailModel = mongoose.model('dispatch_email', post_schema)
module.exports = {
    dispatch_emailModel
}