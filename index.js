'use strict'
import express from 'express';
import mongoose from 'mongoose';
import routers from './routers/index.js';
import path from 'path';
const app = express();
import http from 'http';
const server = http.createServer(app);
const __dirname = path.resolve();

import {Server} from 'socket.io';
const io = new Server(server);


const port = process.env.PORT || 5000;
let json = express.json();
// conect to frontend
const StaticFiles = express.static('./frontend');
app.use(StaticFiles);


// conect to database
// (async ()=>{
//     await mongoose.connect('mondodb://localhost:27017/test')
// })
// app.use(routers);
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });


  app.get('//', (req, res) => {
    res.sendFile( __dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  
server.listen(port,()=> console.log(`Server is listening port ${port}`));