'use strict'

import { Server as WebSocketServer } from 'ws'
import ip from 'ip'
import config from 'config';

import * as srv from './server'

const httpServer = srv.httpServer();

const wsServer = new WebSocketServer({
    server : httpServer,
})
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

httpServer.listen(config.get('port'));
srv.log('Server Start on address - ' + ip.address() + ' - port - ' + config.get('port') + ' - ');