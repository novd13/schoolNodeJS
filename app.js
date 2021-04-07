"use strict";

// const http = require('http');
// var readFile = require("fs").promises.readFile;
// const WebSocket = require('ws');
import http from 'http';
import { readFile } from 'fs/promises';
import WebSocket from 'ws';
import { promisify } from 'util';

redisClient.hset("prokop", "name", "Prokop", "surname", "Dveře", "heslo", "ups", (err, numOfChanged) => {
    console.log("no. of changes: " + numOfChanged);
});

redisClient.hgetall("prokop", (err, dataObj)=>{
    console.log(dataObj);
})

dbHset('tomas', 'surname', 'Jedno').then(()=>{return dbHgetall('tomas')}).then(console.log);


const server = http.createServer((req, res) => {

if (!req.headers.authorization) {
    res.setHeader('WWW-Authenticate', 'Basic');
    res.statusCode = 401;
    res.end();
    return
}
console.log(req.headers.authorization);

const authHeader = req.headers.authorization.split(' ');
const [username, password] = Buffer.from(authHeader[1], 'base64').toString().split(':');
console.log(username);
console.log(password);
    
    readFile('client' + (req.url == "/" ? "/index.html" : req.url))
        .then(f => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            //   readFile('client/index.html').then(f=>res.end(f));
            res.end(f);
        })
        .catch(e => {
            console.error(e);
            res.statusCode = 404;
            res.end();
        })
    console.log(req);
});


server.listen(8080, () => console.log('Server listening: ' + server.listening));

const wss = new WebSocket.Server({port: 8085});

wss.on('connection', ws => {
    let messageCounter = 0;
    console.log(ws);
    ws.send('First message to client');
    ws.on('message', m=>{
        console.log(`Meassage from client: ${m}`);
        ws.send(`Server Echo: ${m}`)
        if (++messageCounter == 4) {ws.close()}
    })
})

/* setTimeout(()=> {
    server.close(()=>console.log('server closed'));
    console.log('Not accepting new connections');
}, 10000); */