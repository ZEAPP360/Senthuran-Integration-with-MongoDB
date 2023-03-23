const mongoose = require("mongoose");

const pomodoroSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      userid: {
        type:String,
        required:true
      }

})
const pomodoroModel = mongoose.model('pomodoro',pomodoroSchema)
module.exports = pomodoroModel