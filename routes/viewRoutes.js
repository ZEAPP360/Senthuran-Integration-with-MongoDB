const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

//renders
router.get("/", viewsController.getLandingPage);

router.get("/login", viewsController.getLoginForm);

module.exports = router;
