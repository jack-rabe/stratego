function onSocketMessage(wss, username, message) {
    //handles all new messages from connections
}

function broadcastMessage(wss, type, data) {
    let json = {
        type: type,
        data: data.toString(),
    };

    wss.clients.forEach(function (client) {
        client.send(JSON.stringify(json));
    });
}

function socketBroadcast(socket, type, data) {
    let json = {
        type: type,
        data: data.toString(),
    };

    socket.send(JSON.stringify(json));
}

export { onSocketMessage, broadcastMessage, socketBroadcast };
