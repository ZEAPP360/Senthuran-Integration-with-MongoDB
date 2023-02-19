const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

//renders
router.get("/", viewsController.getLandingPage);

router.get("/login", viewsController.getLoginForm);

router.get("/articles", viewsController.getArticles);

router.get("/kanban", viewsController.getTaskManager);

router.get("/pomodoro", viewsController.getPomodoro);

router.get("/meditation", viewsController.getMeditation);

router.get("/chatBot", viewsController.getChatBot);

module.exports = router;
