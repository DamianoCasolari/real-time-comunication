// Import necessary modules
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chat:message', (data) => {
        io.emit('chat:message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



// const WebSocket = require('ws');
// import WebSocket from 'ws'; // use wss for secured option
// let WebSocket;
// import('ws').then(ws => {
//     WebSocket = ws.default;

//     const server = new WebSocket.Server({ port: 3000 });

//     server.on('connection', (socket) => {
//         console.log('User connected');

//         // Handle socket connection
//         socket.on('message', (message) => {
//             server.clients.forEach((client) => {
//                 if (client.readyState === WebSocket.OPEN) {
//                     client.send(message);
//                 }
//             });
//         });

//         socket.on('close', () => {
//             console.log('User disconnected');
//         });
//     });
// });