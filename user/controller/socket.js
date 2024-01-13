const { dispatchsupportModel } = require("../../admin/core/db/dispatch.support")
const { userstatusModel } = require("../../admin/core/db/user.status")
const { usersupportModel } = require("../../admin/core/db/user.support")
const { dispatchModel } = require("../../dispatch/core/db/dispatch")
const { userorderModel } = require("../core/db/order")
const { userModel } = require("../core/db/user")


//function to register logged in users to our logged in users
const registeruser = (io) => {
    io.on('connection', (socket) => {
     
//join the room 
      socket.on('supportuser', async (data) => {
        const userid = data.userid
        socket.join(userid)
      })
      
      //send chat  for user
      socket.on('send_user_support', async (data) => {
       
        //send user chat
        const type = data.type
        const usertype = data.usertype
        const text = data.text
        const userid = data.userid

        const talk = await new usersupportModel({
          type , text, userid , usertype
        });
        const chat = await talk.save()
        io.to(userid).emit('receieve_user_support', chat)
          
       
      })
      
          //send chat  for dispatch
          socket.on('send_dispatch_support', async (data) => {
       
            //send user chat
            const type = data.type
            const usertype = data.usertype
            const text = data.text
            const userid = data.userid
    
            const talk = await new dispatchsupportModel({
              type , text, dispatchid:userid , usertype
            });
            const chat = await talk.save()
            io.to(userid).emit('receieve_dispatch_support', chat)
              
           
          })
      
      //dispatch issues 
        //coonect after logged in or signup
        socket.on('updatecordinate', async (data) => {
          const userid = data.dispatchid
          const latitude =  data.latitude           
          const longitude = data.longitude   
          await dispatchModel.findByIdAndUpdate(userid, {
              $set: {
             'cordinate.latitude':latitude,
             'cordinate.longitude':longitude,
              },
            });
      })

     //join the room 
    socket.on('joinorderdispatch', async (data) => {
      const dispatchid = data.dispatchid
      socket.join(dispatchid)
    })
    
    //for pending order
    socket.on('request_pending_order', async (data) => {
      const city = data.city
      const dispatchid= data.dispatchid
      const sendercity = city.toLowerCase();
      let order = await userorderModel.find({ order_taken: false, sendercity });
      io.to(dispatchid).emit('receieve_pending_order', order)
    })
      
    //for my order
    socket.on('request_myorder', async (data) => {
      const dispatchid= data.dispatchid
      let order  = await userorderModel.find({ dispatchid });
      io.to(dispatchid).emit('receieve_myorder', order)
    })
      
      
        //for pending order
    socket.on('request_city', async (data) => {
      const dispatchid= data.dispatchid
      let city = await userorderModel
      .find({ order_taken: false })
      .select("sendercity");
    const citiesWithOrders = {};
    city.forEach((order) => {
      const city = order.sendercity;
      if (!citiesWithOrders[city]) {
        citiesWithOrders[city] = {
          cityName: city, 
          orders: [],
          length: 0,
        };
      }
      citiesWithOrders[city].orders.push(order.toObject()); 
      citiesWithOrders[city].length++;
    });

    // Convert the object to an array
    const citiesArray = Object.values(citiesWithOrders);
      io.emit('receieve_city', citiesArray)
    })
    })
}

module.exports = {
    registeruser
}