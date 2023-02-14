//import dependencies
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
const userRouter = require("./routes/userRoutes");

//create application object
const app = express();

//set templating engine as ejs
app.set("view engine", "ejs");

//middleware
app.use(express.json()); //parses incoming request object as JSON
app.use(express.static(`${__dirname}/public`)); //serves static files e.g. css/img/js

//only runs middleware when development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // logs HTTP requests and errors
}

//check if server is running - test
app.get("/", (req, res) => {
  res.status(200).send("Server is working!!!");
  console.log("Server is up and running");
});

//routes
app.use("/users", userRouter);

//console.log(process.env);

//server listener
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
