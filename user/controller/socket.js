const { userstatusModel } = require("../../admin/core/db/user.status")
const { usersupportModel } = require("../../admin/core/db/user.support")
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
                console.log('socket.id' , socket.id , userid)
                await userstatusModel.findOneAndUpdate({userid}, {
                    $set: {
                   socketid:socket.id
                    },
                  });
            }
           
        })

        socket.on('join_admin_user', () => {
            socket.join('usersupport');
            console.log('Admin joined the room');
          });

      //for chat
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
          const usersocket = await userstatusModel.findOne({ userid })
          const socketid = usersocket.socketid
          if (usertype == 'user') {
            io.to('usersupport').emit('receieve_user_support', chat)
          } else {
              console.log('ending to admin')
            io.to(socketid).emit('receieve_user_support', chat)
          }
       
    })
    })
}

module.exports = {
    registeruser
}