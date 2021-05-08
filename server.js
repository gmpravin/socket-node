const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
// app.use(cors());

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("sendLocation", (data) => {
        console.log(data);
        socket.emit("getLocation", { data });
        return "Helllo";
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
