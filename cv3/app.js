"use strict";

const http = require('http');
const readFile = require('fs/promises').readFile;

const server = http.createServer((req, res)=>{
    readFile('client' +(req.url == "/" ? "/index.html" : req.url))
    .then(f=> {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    fs.readFile('client/index.html').then(f=>res.end(f));
    res.end(f);
})
.catch(e=>{
    console.error(e);
    res.statusCode=404;
    res.end();
})
    console.log(req);
});


server.listen(8080, ()=>console.log('Server listening: '+server.listening));

/* setTimeout(()=> {
    server.close(()=>console.log('server closed'));
    console.log('Not accepting new connections');
}, 10000); */