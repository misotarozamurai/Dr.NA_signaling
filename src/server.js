'use strict'

import { Server as WebSocketServer } from 'ws'
import ip from 'ip'
import * as app from './app'

const template = 'index.html';
const server = app.httpServer( (req, res) => {
    app.index(template, req, res);
})
const wsServer = new WebSocketServer({
    "server" : server,
    "path"   : '/websock',
    port: port
})
const port = 8889;
export let connects = [];

wsServer.on('connection', function connection(sock, req) {
    app.log("webSocketServer connected!");
    // Output connected IP address
    const ip = req.connection.remoteAddress;
    app.log("connected IP : " + ip);

    // Store socket in array
    connects.push(sock);
    app.log('connected sockets : ' + connects.length);


    // ----- When receiving a message -----
    sock.on('message', message => {
        app.log('received : ' + message);
        app.broadcast(message);
    });

    // ----- When the socket is disconnected -----
    sock.on('close', () => {
        app.log('stopping client send "close"');

        // Exclude broken sockets from array
        connects = connects.filter( (conn, i) => {
            return (conn === sock) ? false : true;
        });

        app.log('connected sockets : ' + connects.length);
    });
});

server.listen(port);
app.log('Server Start on address - ' + ip.address() + ' - port - ' + port + ' - ');