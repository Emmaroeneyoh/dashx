const { dispatchsupportModel } = require("../../admin/core/db/dispatch.support")
const { userstatusModel } = require("../../admin/core/db/user.status")
const { usersupportModel } = require("../../admin/core/db/user.support")
const { userModel } = require("../core/db/user")


//function to register logged in users to our logged in users
const registeruser = (io) => {
  io.on('connection', (socket) => {
      
    try {
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

  } catch (error) {
      console.error('Socket error:', error);
  }
     
    })
}

module.exports = {
    registeruser
}