const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
        
        amount: {
            type:Number, default : 0
        },
        status: {
            type:String , 
        },
        trx_type: {
            type:String, 
        },
        transref: {
            type:String, default : ''
        },
        paystackid: {
            type:String, default : ''
        },
        userid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        walletid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'userWallet'
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const userwallethistoryModel = mongoose.model('userwallethistory', Wallet_schema )
module.exports = {
    userwallethistoryModel
}