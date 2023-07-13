const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
var bodyParser = require("body-parser");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://app_user:app_password@192.168.88.242:27017/admin");

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});
var User = mongoose.model("User", nameSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//*****ROUTES **********//
app.get("/", (req, res) => {
  res.send("Connected to the api");
});

app.post("/api", async (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send({ msg: "item saved to database", data: item });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

app.get("/api", async (req, res) => {
  await mongoose.connect(
    "mongodb://app_user:app_password@192.168.88.242:27017/admin"
  );
  mongoose.model("User", User);

  const usr = await User.find({}, "firstName lastName");
  res.status(200).send({ id: id, data: usr });
});

app.post("/api/:id", async (req, res) => {
  const id = req.params.id;
  console.log("ID", id);

  const usr = await User.findOneAndRemove({ _id: id });
  res.status(200).send(usr);
});

//*****ROUTES **********//

io.on("connection", (socket) => {
  const connections = [];
  for (let [id, socket] of io.of("/").sockets) {
    connections.push({ id });
  }
  console.log(connections);
  socket.on("chat message", (user) => {
    io.emit("chat message", user.user + ": " + user.message);
  });

  socket.on("disconnect", (id) => {
    console.log("user disconnected " + id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// base BE with Firebase
// expo app with Firebase
