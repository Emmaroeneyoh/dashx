const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
        
        amount: {
            type:Number, default : 0
        },
        status: {
            type:Boolean , 
        },
        trx_type: {
            type:String, 
        },
     
        dispatchid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'dispatch'
        },
        walletid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'dispatchWallet'
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const dispatchwallethistoryModel = mongoose.model('dispatchwallethistory', Wallet_schema )
module.exports = {
    dispatchwallethistoryModel
}