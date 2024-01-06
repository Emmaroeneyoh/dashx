const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   
   socketid: {
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
const userstatusModel = mongoose.model('userstatus', post_schema)
module.exports = {
    userstatusModel
}