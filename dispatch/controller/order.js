const { userorderModel } = require("../../user/core/db/order");
const { dispatchordermodel } = require("../core/db/listorder");
const { ordercodemodel } = require("../core/db/order_code");
const { handleError } = require("../core/utils");
const {
  dashxcreateorderModel,
  dispatchacceptorderModel,
  dispatchaddordereventModel,
  dispatchpickuporderModel,
  dispatchdeliverorderModel,
  dispatchstartdispatchModel,
} = require("../model/order");

const dashxcreateorderController = async (req, res, next) => {
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
  } = req.body;
  try {
    const data = {
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
    };

    let trainee = await dashxcreateorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: "order created",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const dispatchacceptorderController = async (req, res, next) => {
  const { orderid, dispatchid } = req.body;
  try {
    const order = await dispatchordermodel.findById(orderid);
    if (order.order_taken == true) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "order already taken",
      });
    }
    const data = {
      orderid,
      dispatchid,
    };

    let trainee = await dispatchacceptorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: "order created",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const dispatchaddordereventController = async (req, res, next) => {
  const { orderid, event } = req.body;
  try {
    const order = await dispatchordermodel.findById(orderid);
    if (order.order_taken != true) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "order already taken",
      });
    }
    const data = {
      orderid,
      event,
    };

    let trainee = await dispatchaddordereventModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const dispatchpickuporderController = async (req, res, next) => {
  const { orderid, upload } = req.body;
  try {
    const order = await userorderModel.findById(orderid);
    if (order.order_taken == true) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "order already taken",
      });
    }
    const data = {
      orderid,
      upload,
    };

    let trainee = await dispatchpickuporderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const dispatchstartdispatchController = async (req, res, next) => {
  const { orderid } = req.body;
  try {
    const data = {
      orderid,
    };

    let trainee = await dispatchstartdispatchModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const dispatchdeliveredorderController = async (req, res, next) => {
  const { orderid, ordercode, dispatchid } = req.body;
  try {
    const order = await ordercodemodel.findOne({ order_code : ordercode});
    if (!order) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "wrong order code",
      });
    }
    if (order.code_used) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "code already used",
      });
    }
    const data = {
      orderid,
      ordercode,
      dispatchid,
    };

    let trainee = await dispatchdeliverorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const dispatchlistorderController = async (req, res, next) => {
  try {
    let trainee = await dispatchordermodel.find({ order_taken: false });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  dashxcreateorderController,
  dispatchacceptorderController,
  dispatchlistorderController,
  dispatchaddordereventController,
  dispatchpickuporderController,
  dispatchdeliveredorderController,  dispatchstartdispatchController 
};
