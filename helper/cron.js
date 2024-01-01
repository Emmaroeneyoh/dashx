// var cron = require("node-cron");
// const { packageModel } = require("../admin/core/db/package");
// const { sellerpackagemodel } = require("../seller/core/db/package");
// const { ProductModel } = require("../seller/core/db/product");
// const { SellerModel } = require("../seller/core/db/seller");
// const { expired_date } = require("../seller/core/utils");

// const checkandupdatepackage = () => {
//   cron.schedule("10 10 * * *", async () => {
//     console.log("running a task every 10:10am");
//     const expiredate = expired_date();
//     //find all plan
//     const package = await sellerpackagemodel.find();
//     package.forEach(async (x) => {
//       if (x.expired_date == expiredate) {
//         //we will do 3 things , first update the package to expired , then the seller plan number to 0 and id to ''
//         //also update all seller product to 0 and product plan to ''
//          //update package 
//          const updatepackage= await packageModel.findByIdAndUpdate(x._id, {
//             $set: {
//               plan_expired : true , 
//             },
//         });
//          //update seller 
//          const updateseller= await SellerModel.findByIdAndUpdate(x.sellerid, {
//             $set: {
//               plan :  {
                       
//                 plan_number: 0,
//                 plan_id: ''
//             } , 
//             },
//          });
//           //update product
//           const updateproduct = await ProductModel.updateMany({sellerid : x.sellerid}, {
//             $set: {
//               plan :  {
                       
//                 plan_number: 0,
//                 plan_id: ''
//             } , 
//             },
//           });
          
//       }
//     });
//   });
// };

// module.exports = {
//     checkandupdatepackage
// }