const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const fb_middleware = require("./middleware/firebase_auth");
// app.use(fb_middleware.decodeToken);

app.use(express.json());
app.use(cors());

//********* ROUTE IMPORTS**********//
const user_routes = require("./routes/User.routes");

app.get("/", (req, res) => {
  const status = { status: "Running" };

  res.send(status);
});
// User Routes
app.use("/api/users", user_routes);

//********* WEB_SOCKET **********//

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
