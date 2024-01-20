const { userorderModel } = require("../../user/core/db/order")
const { dispatchModel } = require("../core/db/dispatch")


//function to register logged in users to our logged in users
const updatedispatchcord = (io) => {
    io.on('connection', (socket) => {
        console.log('socket id', socket.id)

   
            
        //coonect after logged in or signup
        socket.on('updatecordinate', async (data) => {
            const userid = data.dispatchid
            const latitude =  data.latitude           
            const longitude = data.longitude   
          const city = data.city 
          const dispatchcity = city.toLowerCase()
            await dispatchModel.findByIdAndUpdate(userid, {
                $set: {
               'cordinate.latitude':latitude,
               'cordinate.longitude':longitude, city : dispatchcity
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
        try {
          const dispatch = await dispatchModel.findById(dispatchid)
          const vehicle = dispatch.vehicle.vehicle_type
            let order = await userorderModel.find({ order_taken: false, sendercity  , vehicle_type:vehicle});
        io.to(dispatchid).emit('receieve_pending_order', order)
        } catch (error) {
            console.log('error' , error)
        }
      })
        
      //for my order
      socket.on('request_myorder', async (data) => {
        const dispatchid= data.dispatchid
        let order  = await userorderModel.find({ dispatchid });
        io.to(dispatchid).emit('receieve_myorder', order)
      })
        
        
          //for pending order
      socket.on('request_city', async (data) => {
        try {
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
        } catch (error) {
            console.log('error' , error) 
        }
      })
    
   
    })
}

module.exports = {
    updatedispatchcord
}