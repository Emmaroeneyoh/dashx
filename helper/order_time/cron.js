
var cron = require("node-cron");
const { dispatchWalletModel } = require("../../dispatch/core/db/wallet");
const { userorderModel } = require("../../user/core/db/order");
const { isOrderExpired } = require("./time_check");


//function to check for all order time and cancel it 

const checkforoverscheduledorder = () => {
   try {
    cron.schedule("0 */6 * * *", async () => {
        console.log('runcron')
      //find all users
        const users = await userorderModel.find({ order_status: "accepted" });
      users.forEach(async (x) => {
          let acceptedtime = x.order_accepted_time
          let dispatchid = x.dispatchid
          let payment_method = x.payment_method
          let commission_fee = x.commission_fee
        console.log('time', acceptedtime)
          
          let checktime = isOrderExpired(acceptedtime)
          console.log('alid', checktime)
          const orderid = x._id
          if (checktime) {
            console.log('iots time to cancel')
            await userorderModel.findByIdAndUpdate(orderid, {
                $set: {
                  order_taken: false,
                  dispatchid:"65935b6b4c3205b88adfcf88", order_status:"pending" , order_accepted_time : '' 
                },
            });
              
              //update dispatch waalet 
              if (!payment_method) {
                await dispatchWalletModel.findOneAndUpdate(
                    { dispatchid},
                    { $inc: { debt:  -commission_fee } }
                  );
              }
        }
      });
    });
   } catch (error) {
     console.log('error' , error)
   }
};
  

module.exports = {
    checkforoverscheduledorder
}