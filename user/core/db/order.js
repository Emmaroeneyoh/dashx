const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
       
        vehicle_type: {
            type:String
        },
        sendername: {
            type:String
        },
        trackingid: {
            type:Number
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
        sendercordinate: {
            senderlat: {
                type:String
        },
            senderlong: {
                type:String
        },
    },
  
        senderlandmark: {
            type:String , default :''
        },
        pickuptime: {
            type:String , default :''
        },
        totalkm: {
            type:Number , default :0
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
    receivercordinate: {
        receiverlat: {
            type:String
    },
        receiverlong: {
            type:String
    },
},
        delivery_fee: {
            type:Number, 
    },
        total_fee: {
            type:Number, 
    },
    commission_fee: {
            type:Number, 
    },
    payment_method: {
            type:Boolean, 
    },
    order_paid: {
            type:Boolean, 
    },
    order_status: {
        type:String,   default :"pending"
},
    order_accepted_time: {
        type:String,   default :""
},
        order_taken: {
            type:Boolean, default : false
        },
        order_completed: {
            type:Boolean, default : false
        },
        userid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'user'
    },
   from_altinsmart: {
        type:Boolean, default : false
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
const userorderModel = mongoose.model('userorder', Wallet_schema )
module.exports = {
    userorderModel
}