import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { WebSocketServer } from 'ws';
import { onSocketMessage, broadcastMessage } from './server/wshandler.js';

const app = express();
const wss = new WebSocketServer({ noServer: true, handshakeTimeout: 1000000 });

let players = new Array(); //online players
let playerWSS = new Object();

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve() + '/dist/index.html'));
});
app.use(express.static('src'));
app.use(express.static('dist'));
app.use('/assets', express.static(path.resolve() + '/dist'));
app.use('/src', express.static(path.resolve() + '/src'));

let server = https
    .createServer(
        {
            //must be after all the app...
            key: fs.readFileSync('./ssl/server.key'),
            cert: fs.readFileSync('./ssl/server.cert'),
        },
        app
    )
    .listen(443, `0.0.0.0`, function () {
        console.log('Listening on port 443!');
    });

wss.on('connection', (socket) => {
    if (players.indexOf(socket.username) == -1) {
        players.push(socket.username);
        playerWSS[socket.username] = socket;
    }

    broadcastMessage(wss, 'onlinePlayers', players);

    socket.on('message', (message) => {
        //new message from connection
        onSocketMessage(wss, socket.username, message);
    });

    socket.on('close', (event) => {
        let index = players.indexOf(socket.username);

        if (index != -1) {
            players.splice(index, 1);
            delete playerWSS[socket.username];
            broadcastMessage(wss, 'onlinePlayers', players);
        }
    });
});

server.on('upgrade', (request, socket, head) => {
    //opening connection
    let username = getCookie('username', request.headers.cookie);

    // if (!username) {
    //     return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii');
    // }

    wss.handleUpgrade(request, socket, head, (socket) => {
        socket.username = username;
        wss.emit('connection', socket, request);
    });
});

setInterval(() => {
    //keep connections alive
    if (wss.clients.size > 0) {
        broadcastMessage(wss, 'ping', new Date().getTime());
    }
}, 1000);

function getCookie(cname, cookies) {
    if (!cookies || cookies.length == 0) return undefined;

    let name = cname + '=';
    let ca = cookies.split(';');
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}
