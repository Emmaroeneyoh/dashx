const { admindashboardModel } = require("../model/dashboard");


const admindashbaordController = async (req, res, next) => {
    try {
      const data = 'pois'
      let trainee = await admindashboardModel(data, res);
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
    admindashbaordController
}