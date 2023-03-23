const mongoose = require("mongoose");
const socketSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
      },
    text: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    roomname:{
      type:String,
     
    }
   

})
const socketModel = mongoose.model('socket',socketSchema)
module.exports = socketModel