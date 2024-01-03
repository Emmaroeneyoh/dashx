const mongoose = require('mongoose')
const schema = mongoose.Schema

const Riderschema = new schema({
 
        bike: {
            type:Number,
         },
   
        car: {
            type:Number,
         },
   
        van: {
            type:Number,
         },
   
        truck: {
            type:Number
         },
   
        price_per_km: {
            type:Number
         },
        comision: {
            type:Number
         },
        systemid: {
            type:String
         },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const pricingModel = mongoose.model('pricing', Riderschema )
module.exports = {
    pricingModel
}