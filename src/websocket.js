let ws;
let disconnects = 0;
let canDisconnect = false;

function connectSocket() {
    let status = document.getElementById('status');
    ws = new WebSocket('wss://www.bilitz.family');

    ws.onopen = (event) => {
        status.innerHTML = 'SERVER: CONNECTED';
        status.style.color = 'green';
        canDisconnect = true;
    };

    ws.onmessage = (message) => {
        serverMessage(message);
    };

    ws.onclose = (event) => {
        status.innerHTML = 'SERVER: DISCONNECTED';
        status.style.color = 'red';
        if (canDisconnect) {
            disconnects++;
            canDisconnect = false;
        }
        setTimeout(() => {
            //retry after 5 seconds
            if (ws.readyState == 3) {
                connectSocket();
            }
        }, 2500);
    };
}

function serverMessage(message) {
    if (message.data.includes('{') || message.data.includes('[')) {
        //data needs to be parsed
        message.data = JSON.parse(message.data);
    }

    if (message.type == 'onlinePlayers') {
        onlinePlayers = message.data;
        // drawOnlinePlayers();
    }
}
