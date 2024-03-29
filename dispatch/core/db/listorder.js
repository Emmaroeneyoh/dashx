const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
       
        vehicle_type: {
            type:String
        },
        sendername: {
            type:String
        },
        productname: {
            type:String
        },
        senderphone: {
            type:String
        },
        senderaddress: {
            type:String
        },
        sendercity: {
            type:String
    },
  
        senderlandmark: {
            type:String , default :''
        },
        receivername: {
            type:String
        },
        receiverphone: {
            type:String
        },
        receiveraddress: {
            type:String
        },
        receivercity: {
            type:String
        },
        receiverlandmark: {
            type:String , default :''
        },
        delivery_fee: {
            type:Number, 
    },
    order_status: {
        type:String,   default :"pending"
},
       
        order_completed: {
            type:Boolean, default : false
        },
        userid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        dispatchid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'dispatch'
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const dispatchorderModel = mongoose.model('dispatchorder', Wallet_schema )
module.exports = {
    dispatchorderModel
}