const mongoose = require("mongoose");

const calendarSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    time: {
      type: String,
      required: true
    },
    date : {
      type : String,
      required:true
    },
    user_id : {
      type:String,
      required:true
    }
   

})
const calendarModel = mongoose.model('calendar',calendarSchema)
module.exports = calendarModel