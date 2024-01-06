const { coonectdb } = require("../../helper/conectdb");
const { dispatchordermodel } = require("../core/db/listorder");
const { ordercodemodel } = require("../core/db/order_code");
const { ordereventmodel } = require("../core/db/order_event");
const { orderuploadmodel } = require("../core/db/order_upload");
const axios = require("axios");
const { userorderModel } = require("../../user/core/db/order");
const { dispatchWalletModel } = require("../core/db/wallet");

const dashxcreateorderModel = async (data, res) => {
  try {
    const {
      shipping_address,
      productname,
      productcity,
      productaddress,
      total_weight,
      total_area,
      quantity,
      altid,
      delivery_fee,
      phone,
      delivery_vehicle,
      sellername,
      customername,
    } = data;
    const form = await new dispatchordermodel({
      shipping_address,
      sellername,
      customername,
      productname,
      productcity,
      productaddress,
      total_weight,
      total_area,
      quantity,
      altid,
      delivery_fee,
      phone,
      delivery_vehicle,
    });

    const order = await form.save();

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchaddordereventModel = async (data, res) => {
  try {
    const { orderid, event } = data;
    const form = await new ordereventmodel({
      orderid,
      event,
    });

    const order = await form.save();

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchacceptorderModel = async (data, res) => {
  try {
    const { orderid, dispatchid } = data;
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_taken: true,
        dispatchid, order_status:"accepted"
      },
    });

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const dispatchpickuporderModel = async (data, res) => {
  try {
const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const { orderid, upload } = data;
    //save order upload
    const form = await new orderuploadmodel({
      orderid,
      upload, 
    });
    await form.save();
     //update pickup time
   await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        pickuptime :currentTime , order_status:"pickup"
      },
    });
    //generate code
    //function to create order code
    function generatecustomerodercode() {
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
      const sixDigitString = randomNumber.toString();
      return sixDigitString;
    }
    const code = generatecustomerodercode();
    const ordercode = await new ordercodemodel({
      orderid,
      order_code: code,
    });

    await ordercode.save();
    //send the code to the user whatsapp and sms

    //end of sending the code

    //update the order status to shipping
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_status: "pickup",
      },
    });

    // //update seller status on altinsmart
    // const order = await dispatchordermodel.findById(orderid);
    // const requestData = {
    //   orderid: order.altid,
    //   status:'shipping'
    // };
    // const apiUrl = "http://localhost:3000/seller/change/order/status";
    // const bearerToken = "iamtryingybest";
    // const response = await axios.post(apiUrl, requestData, {
    //   headers: {
    //     // 'Authorization': `Bearer ${bearerToken}`,
    //     "Content-Type": "application/json", // Adjust content type based on your API requirements
    //   },
    // });
    // console.log("data", response.data);

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchstartdispatchModel = async (data, res) => {
  try {
    const { orderid } = data;

    //update the order status to shipping
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_status: "shipping",
      },
    });

    // //update seller status on altinsmart
    // const order = await dispatchordermodel.findById(orderid);
    // const requestData = {
    //   orderid: order.altid,
    //   status:'shipping'
    // };
    // const apiUrl = "http://localhost:3000/seller/change/order/status";
    // const bearerToken = "iamtryingybest";
    // const response = await axios.post(apiUrl, requestData, {
    //   headers: {
    //     // 'Authorization': `Bearer ${bearerToken}`,
    //     "Content-Type": "application/json", // Adjust content type based on your API requirements
    //   },
    // });
    // console.log("data", response.data);

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const dispatchdeliverorderModel = async (data, res) => {
  try {
    const { orderid, dispatchid, ordercode } = data;
    //update the order status
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_status: "delivered",
      },
    });
    //update the order code
    await ordercodemodel.findOneAndUpdate(
      { orderid },
      {
        $set: {
          code_used: true,
        },
      }
    );
    
    //update the balance of dispatcher
    const order = await userorderModel.findById(orderid);
 
    //update the order code
    const dispatchwallet = await dispatchWalletModel.findOne({dispatchid})
    await dispatchWalletModel.findOneAndUpdate(
      { dispatchid, _id: dispatchwallet._id },
      { $inc: { balance:  order.commison_fee } }
    );

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  dashxcreateorderModel,
  dispatchacceptorderModel,
  dispatchaddordereventModel,
  dispatchpickuporderModel,
  dispatchdeliverorderModel,  dispatchstartdispatchModel
};
