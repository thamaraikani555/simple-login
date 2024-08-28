(function () {
    'use strict';
  
    const express = require('express');
    const device = require('express-device');
    const http = require('http');
    const { Server } = require("socket.io");
    const debugModule = require('debug');
    const path = require('path');
    const dotenv = require('dotenv');
    const routeConfig = require('./config/route-config.js');
    const connectDB = require('./config/db');
    const cors = require('cors');

    dotenv.config();
    const app = express();
    connectDB();
    app.use(cors());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.static(path.join(__dirname, '..', 'uploads')));
    app.use('/uploads', express.static('uploads'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(device.capture());
    
    const debug = debugModule('myapp:server');
    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);
    
    const server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    routeConfig.init(app, '/api/v1'); 
   
    console.log('listening port', process.env.PORT);
    
    function normalizePort(val) {
      const port = parseInt(val, 10);
      if (isNaN(port)) {
        return val;
      }
      if (port >= 0) {
        return port;
      }
      return false;
    }
    // Add error handling middleware
    app.use((err, req, res, next) => {
        console.error('Unhandled error:', err);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    });
    
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }
    
      const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
    
    function onListening() {
      const addr = server.address();
      const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
      debug('Listening on ' + bind);
    }
    
    module.exports = { app: app };
  })();
  
