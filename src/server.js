const express = require('express');
const mongoose = require('mongoose');
const server = express();

const router = require('./routes');

mongoose.connect('yourURL', 
                {useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true
                })

server.use(express.json());
server.use(router);

server.listen(3000);