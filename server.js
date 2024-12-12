
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Signaling server is running.");
});

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('offer', (data) => {
        console.log('Offer received:', data);
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('Answer received:', data);
        socket.broadcast.emit('answer', data);
    });

    socket.on('candidate', (data) => {
        console.log('ICE candidate received:', data);
        socket.broadcast.emit('candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Signaling server running on port ${PORT}`);
});
