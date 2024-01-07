const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userorderModel } = require("../../user/core/db/order");
const { userModel } = require("../../user/core/db/user");



const admindashboardModel = async (data, res) => {
    try {
      const totalrider = await dispatchModel.countDocuments()
      const onlinedriver = await dispatchModel.countDocuments({online_status : true})
      const offlinedriver = await dispatchModel.countDocuments({online_status : false})
  
      const activerider = await dispatchModel.countDocuments({dispatch_blocked : true})
      const totaluser = await userModel.countDocuments()
      const activeuser = await userModel.countDocuments({user_blocked : false})
        const activetrips = await userorderModel.countDocuments({ pending: 'shipping' })
        
        const datas = {
            totalrider , onlinedriver  ,offlinedriver , activerider , totaluser , activeuser ,  activetrips
        }
  
      return datas;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
  
module.exports = {
    admindashboardModel
}