'use strict'

import fs from 'fs'
import http from 'http'
import {connects} from './socket'

export const broadcast = message => {
    connects.forEach((socket, i) => {
        socket.send(message);
    });
}

export const log = str => {
    console.log((new Date).toString() + '\n"' + str + '"\n');
}

export const httpServer = (onRequest) => {
    const _server = http.createServer();

    _server.on('request', (req, res) => {
        log('httpServer on request');
        if (typeof onRequest === 'function') onRequest(req, res);
    });

    _server.on('close', () => {
        log('httpServer closing');
    });

    return _server;
}

export const index = (template, req, res) => {
    fs.stat(template, (err, stats) => {
        if (err) return _error(err);
        if (! stats.isFile()) return _error('not file');

        fs.readFile(template, 'utf-8', (err, data) => {
            if (err) return _error(err);

            res.writeHead(200, {'Content-Type' : 'text/html' });
            res.write(data);
            res.end();
            log('raed file and pirnt: ' + template);
        });
    });
}

export const _error = (res, err) => {
    res.writeHead(500, {'Content-Type' : 'text/plain' });
    res.end(err);
    log(err);
}