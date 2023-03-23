const express = require("express");
const todoController = require("../controllers/todoController")

const router = express.Router();

//renders
router.post("/add", todoController.addTodo);
router.post("/gettodo",todoController.getTodo1)
router.delete("/deletetodo",todoController.deltetodo1)
router.patch("/updateBoard/:id",todoController.updateBoard)
router.delete("/deleteBoard/:id",todoController.deleteBoard)
router.post("/addBoard",todoController.addBoard)
router.post("/getBoard",todoController.getBoard)
router.patch("/updatetodo/:id",todoController.updatetodo)
router.post("/addpomodoro",todoController.addpomodoro)
router.delete("/deleteallpomodoro",todoController.deleteallpomodoro)
router.delete("/deletepomodoro/:id",todoController.deletepomodoro)
router.patch("/updatepomodoro/:id",todoController.updatepomodoro)
router.post("/getpomodoro",todoController.getpomodoro)
router.post("/addcalendar",todoController.addcalendar)
router.delete("/deletecalendar/:id",todoController.deletecalendar)
router.post("/getcalendar",todoController.getcalendar)
router.post("/addmsg",todoController.addmsg)
router.post("/getmsg",todoController.getMsg)


module.exports = router;