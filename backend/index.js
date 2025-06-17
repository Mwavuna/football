const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const playerRoutes = require("./routes/playerRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

global.io = io;

app.use(cors());
app.use(express.json());
app.use("/players", playerRoutes);

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
