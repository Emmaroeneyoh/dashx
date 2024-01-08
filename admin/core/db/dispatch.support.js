const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   text: {
        type:String,
        
    },
  type: {
        type:String,
        
    },
   
    dispatchid: {
        type:  mongoose.Schema.Types.ObjectId,
         ref:'dispatch'
    },
    usertype: {
        type: String,
         
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const dispatchsupportModel = mongoose.model('dispatchsupport', post_schema)
module.exports = {
    dispatchsupportModel
}