'use strict'

import https from 'http'
import {connects} from './socket'
import fs from 'fs'
import config from 'config'

const _serverOptions = {
    key: fs.readFileSync(config.get('KeyRoot') + config.get('FileNames.Key')),
    cert: fs.readFileSync(config.get('KeyRoot') + config.get('FileNames.Cert'))
}

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

export const httpsServer = () => {
    const _server = https.createServer(_serverOptions,(_,res)=>{
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