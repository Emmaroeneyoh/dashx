const { userorderModel } = require("../../user/core/db/order");
const { dispatchModel } = require("../core/db/dispatch");
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
  dispatchcancelorderModel,
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
    const order = await userorderModel.findById(orderid);
    const dispatch = await dispatchModel.findById(dispatchid)
    const ordercity = order.sendercity.toLowerCase()
    const dispatchcity = dispatch.city.toLowerCase()
    console.log('ordercity', ordercity, 'dispatchcity', dispatchcity)
    //check if dispatch is verified
    const verifydispatch = dispatch.dispatch_approved
    if (!verifydispatch) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "account not approved",
      });
    }
    if (ordercity != dispatchcity) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "order not in current city",
      });
    }
    if (order.order_taken == true) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "order already taken",
      });
    }
    const data = {
      orderid,
      dispatchid
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
    const order = await userorderModel.findById(orderid);
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
    // if (order.order_taken == true) {
    //   return res.status(400).json({
    //     status_code: 400,
    //     status: true,
    //     message: "order already taken",
    //   });
    // }
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
const dispatchcancelorderController = async (req, res, next) => {
  const { orderid , dispatchid} = req.body;
  try {
    const order = await userorderModel.findById(orderid)
    if (order.order_status == 'delivered' || order.order_completed) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "order cant be cancelled",
      });
    }
    const data = {orderid , dispatchid}
    let trainee = await  dispatchcancelorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "order cancelled",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const dispatchstartdispatchController = async (req, res, next) => {
  const { orderid , dispatchid , totalkm} = req.body;
  try {
    const checkorder = await userorderModel.find({ dispatchid, order_status: 'shipping' })
    console.log('check pending' , checkorder)
    if (checkorder.length > 0) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "can't run two dispatch simultaneously",
      });
 }
    const data = {
      orderid, totalkm
    };

    let trainee = await dispatchstartdispatchModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      // data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const dispatchdeliveredorderController = async (req, res, next) => {
  const { orderid, ordercode, dispatchid } = req.body;
  try {
    const order = await ordercodemodel.findOne({ order_code: ordercode });
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
    const { city, dispatchid } = req.body;
    const dispatch = await dispatchModel.findById(dispatchid);
    // console.log(dispatch.online_status)
    // if (!dispatch.online_status) {
    //   return res.status(400).json({
    //     status_code: 400,
    //     status: true,
    //     message: "you are currently offline",
    //   });
    // }
    const sendercity = city.toLowerCase();
    let trainee = await userorderModel.find({ order_taken: false, sendercity });
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
const dispatchorderhistoryController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;

    let trainee = await userorderModel.find({ dispatchid });
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
const dispatchlistcityController = async (req, res, next) => {
  try {
    let city = await userorderModel
      .find({ order_taken: false })
      .select("sendercity");
    // const cities = city.map(x => x.sendercity)
    // const uniqueCitiesSet = new Set(cities);
    // const dcity = Array.from(uniqueCitiesSet);

    const citiesWithOrders = {};
    city.forEach((order) => {
      const city = order.sendercity;

      if (!citiesWithOrders[city]) {
        // If the city doesn't exist in the new array, create an entry
        citiesWithOrders[city] = {
          cityName: city, // Include the city name
          orders: [],
          length: 0,
        };
      }

      // Add the order to the city's array
      citiesWithOrders[city].orders.push(order.toObject()); // Using toObject() to convert Mongoose document to plain JavaScript object

      // Increment the length for the city
      citiesWithOrders[city].length++;
    });

    // Convert the object to an array
    const citiesArray = Object.values(citiesWithOrders);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: citiesArray,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const dispatchacceptedorderController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    let trainee = await userorderModel.find({
      order_taken: true,
      dispatchid,
      order_status: { $ne: "delivered" },
    });
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
  dispatchdeliveredorderController,
  dispatchstartdispatchController,
  dispatchacceptedorderController,
  dispatchlistcityController,
  dispatchorderhistoryController,
  dispatchcancelorderController,
};
