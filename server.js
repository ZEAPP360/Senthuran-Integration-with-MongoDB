//import dependencies
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

//loads environmental variables from .env file
dotenv.config({ path: "./config.env" });

//store database URI in DB
const DB = process.env.DATABASE;

//fix deprecation warning - fields will be saved in database even when not specified in Schema
mongoose.set("strictQuery", false);

//connect to MongoDB
mongoose.connect(DB).then(() => {
  console.log("Database Connection Successful");
});

//import routers
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");

//create application object
const app = express();

//set templating engine as ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); //serves static files e.g. css/img/js

//middleware
app.use(express.json()); //parses incoming request object as JSON

//only runs middleware when in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // logs HTTP requests and errors
}

//check if server is running - test
// app.get("/", (req, res) => {
//   res.status(200).send("Server is working!!!");
//   console.log("Server is up and running");
// });

//renders
app.get("/", (req, res) => {
  res.status(200).render("base");
});

app.get("/login", (req, res) => {
  res.status(200).render("login");
});

//routes
app.use("/users", userRouter);

//handles all unhandled routes regardless of HTTP method
//should always go after routes so that it is executed last
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

console.log(`Running in ${process.env.NODE_ENV} mode`);

//server listener
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
