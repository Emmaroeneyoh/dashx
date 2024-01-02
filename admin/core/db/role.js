const mongoose = require('mongoose')
const schema = mongoose.Schema

const Riderschema = new schema({
 
        role: {
            type:String,
    },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const adminroleModel = mongoose.model('adminrole', Riderschema )
module.exports = {
    adminroleModel
}