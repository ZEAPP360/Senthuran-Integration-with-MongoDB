const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      type:{
        type: String,
        required:true
      },
      Board_id:{ 
        type:String,
        required:true
      },
      completed: {
        type: Boolean,
        default: false
      },
      user: {
        type: String,
        ref: 'User',
      },
     
   

})
const todoModel = mongoose.model('todo-Database',todoSchema)
module.exports = todoModel