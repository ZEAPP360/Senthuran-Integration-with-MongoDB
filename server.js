//import dependencies
const path = require("path");
const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");




const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
var bodyParser = require('body-parser');


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
const viewRouter = require("./routes/viewRoutes");
const todoRouter = require("./routes/todoRoutes")
//create application object
//create server
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");

//set templating engine as ejs
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}))
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

//mount routes
app.use("/", viewRouter);
app.use("/users", userRouter);
app.use("/todo", todoRouter);
//handles all unhandled routes regardless of HTTP method
//should always go after routes so that it is executed last
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

console.log(`Running in ${process.env.NODE_ENV} mode`);

const botName = "Chatroom Bot";
io.on("connection", (socket) => {
  console.log(io.of("/").adapter);
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    // Welcome current user
    socket.emit("message", formatMessage(username, "Welcome to Chatroom"));
    
    // Broadcast when a user connects
    socket.broadcast
    .to(user.room)
    .emit(
      "message",
      formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});
//server listener
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
