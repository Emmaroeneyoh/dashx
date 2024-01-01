const mongoose = require('mongoose')
const schema = mongoose.Schema

const Riderschema = new schema({
 
        name: {
            type:String,
    },
        email: {
            type:String,
        },
        password:{
            type:String
        },
        phone:{
            type:String
        },
        admin_blocked:{
            type:Boolean , default : false
        },
        roles: {
            default: [],
            type: [
              {
                role: {
                type:  String
        },
              },
            ],
          },
       
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const adminModel = mongoose.model('admin', Riderschema )
module.exports = {
    adminModel
}