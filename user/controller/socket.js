const { userstatusModel } = require("../../admin/core/db/user.status")
const { userModel } = require("../core/db/user")


//function to register logged in users to our logged in users
const registeruser = (io) => {
    io.on('connection', (socket) => {
        console.log('socket id', socket.id)
        
        //coonect after logged in or signup
        socket.on('registeruser', async (data) => {
            const userid = data.userid
            console.log('checked now', data , socket.id)
            // const datavalue = JSON.stringify(data)
            
            //check if userid exist already
            const checkuser = await userstatusModel.findOne({ userid })
            if (!checkuser) {
                console.log('socket.id' , socket.id)
                const form = await new userstatusModel({
                    userid , socketid:socket.id
                });
               
                const userDetails = await form.save()
            } else {
                console.log('socket.id' , socket.id)
                await userstatusModel.findOneAndUpdate({userid}, {
                    $set: {
                   socketid:socket.id
                    },
                  });
            }
           
        })


        // //coonect after logged in or signup
        // socket.on('unregister', async (data) => {
        //     console.log('checked now' , data)
        //     // uncacheusers(data)
        //     await userModel.findByIdAndUpdate(data, {
        //         $set: {
        //           status: "offline",
        //         },
        //       });
        // })

        //after client ot server disconnects
        socket.on('disconnect', async() => {
            console.log('A client disconnected:', socket.id);
            // const userid = await retrievecacheuserstatus(socket.id)
            // console.log('this is offline client', userid)
            //update the user profile from the database
            // await userModel.findByIdAndUpdate(userid, {
            //     $set: {
            //       status: "offline",
            //     },
            //   });
          });
    })
}

module.exports = {
    registeruser
}