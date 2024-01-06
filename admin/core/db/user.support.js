const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   message: {
        type:String,
        
    },
   messagetype: {
        type:String,
        
    },
   
    userid: {
        type:  mongoose.Schema.Types.ObjectId,
         ref:'user'
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const usersupportModel = mongoose.model('usersupport', post_schema)
module.exports = {
    usersupportModel
}