const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      user_id : {
        type: String,
        required: true
      },
      
})

const boardModel = mongoose.model('Board-Scheme',boardSchema)
module.exports = boardModel