'use strict'

import { Server as WebSocketServer } from 'ws'
import ip from 'ip'
import * as srv from './server'

const template = 'index.html';
const server = srv.httpServer( (req, res) => {
    srv.index(template, req, res);
})
const wsServer = new WebSocketServer({
    "server" : server,
    "path"   : '/websock',
    port: port
})
const port = 8889;
export let connects = [];

wsServer.on('connection', function connection(sock, req) {
    srv.log("webSocketServer connected!");
    // Output connected IP address
    const ip = req.connection.remoteAddress;
    srv.log("connected IP : " + ip);

    // Store socket in array
    connects.push(sock);
    srv.log('connected sockets : ' + connects.length);


    // ----- When receiving a message -----
    sock.on('message', message => {
        srv.log('received : ' + message);
        srv.broadcast(message);
    });

    // ----- When the socket is disconnected -----
    sock.on('close', () => {
        srv.log('stopping client send "close"');

        // Exclude broken sockets from array
        connects = connects.filter( (conn, i) => {
            return (conn === sock) ? false : true;
        });

        srv.log('connected sockets : ' + connects.length);
    });
});

server.listen(port);
srv.log('Server Start on address - ' + ip.address() + ' - port - ' + port + ' - ');