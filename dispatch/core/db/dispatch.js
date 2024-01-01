const mongoose = require('mongoose')
const schema = mongoose.Schema

const Riderschema = new schema({
 
        name: {
            type:String,
    },
    online_status: {
        type: Boolean,
        default: false
      },
    dispatch_approved: {
        type: Boolean,
        default: false
      },
      personel_account: {
        type: Boolean,
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
        photo:{
            type:String , default : ''
        },
        dispatch_blocked:{
            type:Boolean , default : false
        },
        vehicle:{
            vehicle_number:{
                type:String , default : ''
            },
            vehicle_type:{
                type:String , default : ''
            },
        },
        kin:{
            kin_number:{
                type:String , default : ''
            },
            kin_name:{
                type:String , default : ''
            },
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
       
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const dispatchModel = mongoose.model('dispatch', Riderschema )
module.exports = {
    dispatchModel
}