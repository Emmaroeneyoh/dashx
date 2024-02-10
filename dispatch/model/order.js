const { coonectdb } = require("../../helper/conectdb");
const { dispatchordermodel } = require("../core/db/listorder");
const { ordercodemodel } = require("../core/db/order_code");
const { ordereventmodel } = require("../core/db/order_event");
const { orderuploadmodel } = require("../core/db/order_upload");
const axios = require("axios");
const { userorderModel } = require("../../user/core/db/order");
const { dispatchWalletModel } = require("../core/db/wallet");
const { captureOrderTime } = require("../../helper/order_time/time_check");

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
    //check if the order is pay on delivery
    const order = await userorderModel.findById(orderid);
    const from_altinsmart = order.from_altinsmart;
    const payment_method = order.payment_method;
    const orderacceptedtime = captureOrderTime();
    if (!payment_method) {
      await dispatchWalletModel.findOneAndUpdate(
        { dispatchid },
        { $inc: { debt: order.commission_fee } }
      );
    }
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_taken: true,
        dispatchid,
        order_status: "accepted",
        order_accepted_time: orderacceptedtime,
      },
    });

    //check if the order is from altinsmart and update it
    if (from_altinsmart) {
      const requestData = {
        trackingid: order.trackingid.toString(),
        status: "accepted",
      };
      const apiUrl = "http://localhost:3000/customer/dashx/order/status";
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // Adjust content type based on your API requirements
        },
      });

      if (!response.data.status) {
        return "failed";
      }
    }
    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const dispatchpickuporderModel = async (data, res) => {
  try {
    const currentTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

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
        pickuptime: currentTime,
        order_status: "pickup",
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

    //check if the order is from altinsmart and update it
    const order = await userorderModel.findById(orderid);
    const from_altinsmart = order.from_altinsmart;
    if (from_altinsmart) {
      const requestData = {
        trackingid: order.trackingid.toString(),
        status: "pickup",
      };
      const apiUrl = "http://localhost:3000/customer/dashx/order/status";
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // Adjust content type based on your API requirements
        },
      });

      if (!response.data.status) {
        return "failed";
      }
    }

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchstartdispatchModel = async (data, res) => {
  try {
    const { orderid, totalkm } = data;
    //update the order status to shipping
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_status: "shipping",
        totalkm,
      },
    });

    //check if the order is from altinsmart and update it
    const order = await userorderModel.findById(orderid);
    const from_altinsmart = order.from_altinsmart;
    if (from_altinsmart) {
      const requestData = {
        trackingid: order.trackingid.toString(),
        status: "shipping",
      };
      const apiUrl = "http://localhost:3000/customer/dashx/order/status";
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // Adjust content type based on your API requirements
        },
      });

      if (!response.data.status) {
        return "failed";
      }
    }

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
        order_paid: true,
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
    const delivery_fee = order.delivery_fee;
    const dispatchwallet = await dispatchWalletModel.findOne({ dispatchid });
    const payment_method = order.payment_method;
    //update the order code
    if (payment_method) {
      //check if the dispatch is in debt
      const dispatchdebt = dispatchwallet.debt;
      const dispatchbalance = dispatchwallet.balance;
      if (dispatchdebt > 0) {
        const totalbalance = dispatchbalance - dispatchdebt;
        //update the wallet
        await dispatchWalletModel.findOneAndUpdate(
          { dispatchid },
          {
            $set: {
              balance: totalbalance,
              debt: 0,
            },
          }
        );
      }

      //update the wallet with delivery fee
      await dispatchWalletModel.findOneAndUpdate(
        { dispatchid, _id: dispatchwallet._id },
        { $inc: { balance: order.delivery_fee } }
      );
    }

    //check if the order is from altinsmart and update it
    const from_altinsmart = order.from_altinsmart;
    if (from_altinsmart) {
      const requestData = {
        trackingid: order.trackingid.toString(),
        status: "delivered",
      };
      const apiUrl = "http://localhost:3000/customer/dashx/order/status";
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // Adjust content type based on your API requirements
        },
      });

      if (!response.data.status) {
        return "failed";
      }
    }

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchcancelorderModel = async (data, res) => {
  try {
    const { orderid, dispatchid } = data;
    //check order payment method
    //update the order status
    await userorderModel.findByIdAndUpdate(orderid, {
      $set: {
        order_taken: false,
        dispatchid: "65935b6b4c3205b88adfcf88",
        order_status: "pending",
      },
    });
    // //update the order code
    // await ordercodemodel.findOneAndUpdate(
    //   { orderid },
    //   {
    //     $set: {
    //       code_used: true,
    //     },
    //   }
    // );

    //update the balance of dispatcher
    const order = await userorderModel.findById(orderid);
    const dispatchwallet = await dispatchWalletModel.findOne({ dispatchid });
    const payment_method = order.payment_method;
    //update the order code
    if (!payment_method) {
      //check if the dispatch is in debt
      const dispatchdebt = dispatchwallet.debt;
      const dispatchbalance = dispatchdebt - order.commission_fee;
      await dispatchWalletModel.findOneAndUpdate(
        { dispatchid },
        {
          $set: {
            debt: dispatchbalance,
          },
        }
      );
    }

    //check if the order is from altinsmart and update it
    const from_altinsmart = order.from_altinsmart;
    if (from_altinsmart) {
      const requestData = {
        trackingid: order.trackingid.toString(),
        status: "pending",
      };
      const apiUrl = "http://localhost:3000/customer/dashx/order/status";
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // Adjust content type based on your API requirements
        },
      });

      if (!response.data.status) {
        return "failed";
      }
    }
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
  dispatchdeliverorderModel,
  dispatchstartdispatchModel,
  dispatchcancelorderModel,
};
