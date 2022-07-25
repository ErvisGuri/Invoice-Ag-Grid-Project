const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    socket.on("send_record", (data) => {
        console.log(`User ${socket.id} ${data}`)
        socket.broadcast.emit("receive_record", data)
    })

})


server.listen(3001, () => { console.log("Server is running") })