const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

//renders
router.get("/", viewsController.getHomePage);

router.get("/login", viewsController.getLoginForm);

router.get("/calendar", viewsController.getCalendar);

router.get("/kanban", viewsController.getKanban);

router.get("/pomodoro", viewsController.getPomodoro);

router.get("/meditation", viewsController.getMeditation);

router.get("/chatLobby", viewsController.getChatLobby);

router.get("/chatRoom", viewsController.getChatRoom);

module.exports = router;
