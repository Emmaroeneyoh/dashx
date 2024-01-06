const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
        
        balance: {
            type:Number, default : 0
        },
        account_number: {
            type:String, default : ''
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
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const userWalletModel = mongoose.model('userWallet', Wallet_schema )
module.exports = {
    userWalletModel
}