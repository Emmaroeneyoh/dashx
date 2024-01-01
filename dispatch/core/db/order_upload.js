const mongoose = require('mongoose')
const schema = mongoose.Schema


const order_schema = new schema({
 
  
    upload: {
        default: [],
        type: [
          {
            url: {
              type: String,
            },
          },
        ],
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
const orderuploadmodel = mongoose.model('orderupload', order_schema )
module.exports = {
    orderuploadmodel
}