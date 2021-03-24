"use strict";

const http = require('http');
var readFile = require("fs").promises.readFile;
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
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