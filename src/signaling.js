'use strict'

import { Server as WebSocketServer } from 'ws'
const port = 8080;
const wsServer = new WebSocketServer({port: port});

wsServer.on('connection', sock => {
    console.log('-- websocket connected --');
    sock.on('message', message => {
        wsServer.clients.forEach( client => {
            if(isSame(sock, client)) {
                console.log('- skip sender -');
            } else {
                client.send(message);
            }
        });
    });
});

const isSame = (ws1, ws2) => {
    // -- compare object --
    return (ws1 === ws2);
}

console.log('websocket server start. port=' + port);