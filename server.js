//import dependencies
const express = require("express");
const morgan = require("morgan");

//create application object
const app = express();

//set templating engine as ejs
app.set("view engine", "ejs");

//middleware
app.use(express.json()); //parses incoming request object as JSON
app.use(morgan("dev")); // logs HTTP requests and errors

//check if server is running - test
app.get("/", (req, res) => {
  res.status(200).send("Server is working!!!");
  console.log("Server is up and running");
});

//server listener
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
