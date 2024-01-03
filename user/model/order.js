const { userorderModel } = require("../core/db/order");
const { userModel } = require("../core/db/user");
const { userWalletModel } = require("../core/db/wallet");




const usercreateorderModel = async (data, res) => {
    try {
      const {
        vehicle_type,
        sendername,
        productname,
        senderphone,
        senderaddress,
      city,
        senderlandmark,
        receivername,
        receiverphone,
        receiveraddress,
        receivercity,
        receiverlandmark, delivery_fee , userid , total_fee ,      senderlat,
        senderllong, 
        receiverlat,
        receiverllong,
       
      } = data;
      const form = await new userorderModel ({
        vehicle_type,
        sendername,
        productname,
        senderphone,
        senderaddress,
        sendercity : city,
        senderlandmark,
        receivername,
        receiverphone,
        receiveraddress,
        receivercity,
        receiverlandmark, delivery_fee , userid , total_fee ,   receivercordinate: {
            receiverlat: {
                type:String
        },
            receiverlong: {
                type:String
        },     sendercordinate: {
            senderlat: {
                type:String
        },
            senderlong: {
                type:String
        },
    },
    },
      });
        const userDetails = await form.save()
        
        //update wallet of user
        //find the wallet of the user
        const wallet = await userWalletModel.findOne({ userid })
        const walletid = wallet._id
        await userWalletModel.findByIdAndUpdate(walletid, 
            { $inc: { balance: -total_fee } }
          );
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};
  

const userretrievesingleorderModel = async (data, res) => {
    try {
      const { orderid } = data;
        const profile = await userorderModel.findById(orderid)
        // const review = await productreviewModel.find({productid})
        //  const data = { product , review}
      return profile;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
module.exports = {
    usercreateorderModel , userretrievesingleorderModel
}