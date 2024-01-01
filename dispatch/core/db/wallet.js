const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
        
        balance: {
            type:Number, default : 0
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
const dispatchWalletModel = mongoose.model('dispatchWallet', Wallet_schema )
module.exports = {
    dispatchWalletModel
}