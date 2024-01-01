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