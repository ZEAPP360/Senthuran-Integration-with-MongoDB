//contains all the handlers for authentication

const catchAsync = require("./../utils/catchAsync");

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./localStorage');

const TodoModel = require("./../models/todoModel")
const PomodoroModel = require("./../models/addpomodoro")
const CalendarModel = require("./../models/calendarModel")
const SocketModel = require("./../models/socketmodel");
const boardModel = require("../models/boardModel");

exports.addTodo = catchAsync(async (req, res, next) => {
    // let id =   localStorage.getItem("User_Id")
    // let todoData = new TodoModel({todo_number:1,todo_data:"test"})
    // const todosCollection = db.collection("todoData");
    // // todoData.save()
    // // .then((response)=>{
    // //     console.log("Response Success",response)
    // //     res.status(200).send({result:response,message:"Data Saved Successfully"})
    // // })
    // // .catch((err)=>{
    // //     console.log("Error Generated:",err)
    // //     res.status(400).send({result:response,message:"Error"})

    // })
    // var result = await TodoModel.find({})
    // res.status(200).send({message:"All Data",data:result})
    try {
        const todo = new TodoModel({
            title: req.body.title,
            user: req.body.user,
            type: req.body.type,
            Board_id:req.body.Board_id,
        });
        await todo.save()
            .then((response) => {
                console.log("Response Success", response)
                res.status(200).send({ result: response, message: "Data Saved Successfully" })
            })
            .catch((err) => {
                console.log("Error Generated:", err)
                res.status(400).send({ result: err, message: "Error" })

            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)
exports.addmsg = catchAsync(async (req, res, next) => {
    try {
        const todo = new SocketModel({
            username:req.body.username,
          
            text:req.body.text,
            time:req.body.time,
            roomname : req.body.roomname
           
        });
        await todo.save()
            .then((response) => {
                console.log("Response Success", response)
                res.status(200).send({ result: response, message: "Data Saved Successfully" })
            })
            .catch((err) => {
                console.log("Error Generated:", err)
                res.status(400).send({ result: err, message: "Error" })
            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)



exports.addpomodoro = catchAsync(async (req, res, next) => {
    // let id =   localStorage.getItem("User_Id")
    // let todoData = new TodoModel({todo_number:1,todo_data:"test"})
    // const todosCollection = db.collection("todoData");
    // // todoData.save()
    // // .then((response)=>{
    // //     console.log("Response Success",response)
    // //     res.status(200).send({result:response,message:"Data Saved Successfully"})
    // // })
    // // .catch((err)=>{
    // //     console.log("Error Generated:",err)
    // //     res.status(400).send({result:response,message:"Error"})

    // })
    // var result = await TodoModel.find({})
    // res.status(200).send({message:"All Data",data:result})
    try {
        const todo = new PomodoroModel({
            title: req.body.title,
            userid : req.body.userid
        });
        await todo.save()
            .then((response) => {
                console.log("Response Success", response)
                res.status(200).send({ result: response, message: "Data Saved Successfully" })
            })
            .catch((err) => {
                console.log("Error Generated:", err)
                res.status(400).send({ result: err, message: "Error" })

            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)
exports.addcalendar = catchAsync(async (req, res, next) => {
    // let id =   localStorage.getItem("User_Id")
    // let todoData = new TodoModel({todo_number:1,todo_data:"test"})
    // const todosCollection = db.collection("todoData");
    // // todoData.save()
    // // .then((response)=>{
    // //     console.log("Response Success",response)
    // //     res.status(200).send({result:response,message:"Data Saved Successfully"})
    // // })
    // // .catch((err)=>{
    // //     console.log("Error Generated:",err)
    // //     res.status(400).send({result:response,message:"Error"})

    // })
    // var result = await TodoModel.find({})
    // res.status(200).send({message:"All Data",data:result})
    try {
        const todo = new CalendarModel({
            title: req.body.title,
            time:req.body.time,
            date : req.body.date,
            user_id : req.body.user_id
        });
        await todo.save()
            .then((response) => {
                console.log("Response Success", response)
                res.status(200).send({ result: response, message: "Data Saved Successfully" })
            })
            .catch((err) => {
                console.log("Error Generated:", err)
                res.status(400).send({ result: err, message: "Error" })

            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)
exports.deletecalendar = catchAsync(async (req, res, next) => {
   console.log(req.params.id)
    try {
        await CalendarModel.findByIdAndDelete(req.params.id).then((blog) => {
            if (!blog) {
                return res.status(404).send();
            }
            res.send(blog);
        }).catch((error) => {
            res.status(500).send(error);
        })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)
exports.getcalendar = catchAsync(async (req, res, next) => {
    const calendar = await CalendarModel.find({
        user_id : req.body.user_id
    });
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: calendar.length,
      data: {
        calendar,
      },
    });
  });
exports.deletepomodoro = catchAsync(async (req, res, next) => {
    try {
        PomodoroModel.findByIdAndDelete(req.params.id).then((blog) => {
            if (!blog) {
                return res.status(404).send();
            }
            res.send(blog);
        }).catch((error) => {
            res.status(500).send(error);
        })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)

exports.deleteBoard = catchAsync(async (req, res, next) => {
    try {
            await boardModel.findByIdAndDelete(req.params.id).then(async (blog) => {
            if (!blog) {
                return res.status(404).send();
            }
            else{
                console.log("Data:",response)
                
                res.status(200).send({result:response,message:"Data Delete Successfully"})
                await TodoModel.deleteMany({ userid: req.body.userid,Board:req.body.Board}).then((blog) => {
                    if (!blog) {
                        return res.status(404).send();
                    }
                    else{
                        console.log("Data:",response)
                        
                        res.status(200).send({result:response,message:"Data Delete Successfully"})
                        
                    }})
            }
            res.send(blog);
        }).catch((error) => {
            res.status(500).send(error);
        })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }

   
      
   }
  

)

exports.deltetodo1 = catchAsync(async (req, res, next) => {
    

     await  TodoModel.deleteOne({
        _id: req.body._id
          
        })
        .then((doc) => {
          if (doc) {
            console.log("Document deleted successfully:", doc);
            res.status(200).send({message: "Document deleted successfully", data: doc});
          } else {
            console.log("Document not found with ID:", req.params.id);
            res.status(500).send(error);
          }
        })
       
    }
   

)

exports.deleteallpomodoro = catchAsync(async (req, res, next) => {
    try {
        var result = await   PomodoroModel.deleteMany({ userid: req.body.userid})
    .then((response)=>{
        console.log("Data:",response)
        res.status(200).send({result:response,message:"Data Delete Successfully"})
     })
    .catch((err)=>{console.log(err)})
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)
exports.updatepomodoro = catchAsync(async (req, res, next) => {
    try {
        PomodoroModel.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
                if (!blog) {
                    return res.status(404).send('updated');
                }
                res.send(blog);
            }).catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)



exports.updateBoard = catchAsync(async (req, res, next) => {
    try {
        boardModel.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
                if (!blog) {
                    return res.status(404).send('updated');
                }
                res.send(blog);
            }).catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)


exports.updatetodo = catchAsync(async (req, res, next) => {
    try {
        TodoModel.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
                if (!blog) {
                    return res.status(404).send('updated');
                }
                res.send(blog);
            }).catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (e) {
        res.status(400).send({ result: e, message: "Error" })
    }
}
)

exports.getpomodoro = catchAsync(async (req, res, next) => {
    const users = await PomodoroModel.find({
        userid : req.body.userid
    });
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  });

  

exports.getTodo1 = catchAsync(async (req, res, next) => {
    var result = await TodoModel.find(
        {

            user: req.body.user,
            type:req.body.type,
            Board_id:req.body.Board_id
          
        }
    )
    res.status(200).send({ message: "All Data of ", data: result })
})


exports.addBoard = catchAsync(async (req, res, next) => {
    try {
        const addboard = new boardModel({
            title : req.body.title,
            user_id : req.body.user_id
        })
        await addboard.save()
        .then((response) => {
            console.log("Response Success", response)
            res.status(200).send({ result: response, message: "Data Saved Successfully" })
        })
        .catch((err) => {
            console.log("Error Generated:", err)
            res.status(400).send({ result: err, message: "Error" })

        })
    }
    catch(e){
        console.log("Error Generated:", err)
        res.status(400).send({ result: err, message: "Error" })
    }

})

exports.getBoard = catchAsync(async (req, res, next) => {
    try {
        const addboard = await boardModel.find({
            user_id : req.body.user_id
        })
        res.status(200).send({ message: "All Data of ", data: addboard  })
       
    }
    catch(e){
        console.log("Error Generated:", e)
        res.status(400).send({ result: e, message: "Error" })
    }

})

exports.getTodo1 = catchAsync(async (req, res, next) => {
    var result = await TodoModel.find(
        {

            user: req.body.user,
            type:req.body.type,
            Board_id:req.body.Board_id
          
        }
    )
    res.status(200).send({ message: "All Data of ", data: result })
})


exports.getMsg = catchAsync(async (req, res, next) => {
    var result = await SocketModel.find(
        {
            roomname : req.body.roomname
        }
    )
    res.status(200).send({ message: "All Data of ", data: result })
})


