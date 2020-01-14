'use strict'

import http from 'http'
import {connects} from './socket'

export const broadcast = (message,sock) => {
    connects
        .filter(t=>t!==sock)
        .forEach(socket => {
            socket.send(message);
        });
}

export const log = str => {
    console.log((new Date).toString() + '\n"' + str + '"\n');
}

export const httpServer = () => {
    const _server = http.createServer((req,res)=>{
        res.writeHead(404);
        res.end();
    });

    return _server;
}


export const _error = (res, err) => {
    console.log(res)
    res.writeHead(500, {'Content-Type' : 'text/plain' });
    res.end(err);
    log(err);
}