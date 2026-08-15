const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// public folder se website serve hogi
app.use(express.static("public"));

// User connect hone par
io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Message receive karke sab users ko bhejna
    socket.on("chat message", (data) => {
        io.emit("chat message", {
            user: data.user,
            text: data.text
        });
    });

    // User disconnect
    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

// Server start
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Chat server running on port ${PORT}`);
});
