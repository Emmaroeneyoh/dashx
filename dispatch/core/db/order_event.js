const mongoose = require('mongoose')
const schema = mongoose.Schema


const order_schema = new schema({
 
  
    event: {
            type:String,  
    },
    orderid: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:'dispatchorder'
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const ordereventmodel = mongoose.model('orderevent', order_schema )
module.exports = {
    ordereventmodel
}