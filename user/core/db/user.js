const mongoose = require('mongoose')
const schema = mongoose.Schema

const Riderschema = new schema({
 
    name: {
        type: String,
    },
    email: {
        type: String,
    },
       address: {
            type:String,
        },
       state : {
            type:String,
        },
       latitude : {
            type:String,
        },
       longitude : {
            type:String,
        },
        password:{
            type:String
        },
        phone:{
            type:String
        },
        user_blocked:{
            type:Boolean , default : false
        },
        auth:{
            auth_token:{
                type:String , default : ''
            },
            auth_code:{
                type:String , default : ''
            },
            auth_verified:{
                type:Boolean , default : false
            },
    },
    flutterwaveid:{
        type:String , default : ''
    },
       
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const userModel = mongoose.model('user', Riderschema )
module.exports = {
    userModel
}