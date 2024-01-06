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
            await dispatchModel.findByIdAndUpdate(userid, {
                $set: {
               'cordinate.latitude':latitude,
               'cordinate.longitude':longitude,
                },
              });
        })

       
    })
}

module.exports = {
    updatedispatchcord
}