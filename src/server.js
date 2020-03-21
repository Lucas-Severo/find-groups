const express = require('express');
const mongoose = require('mongoose');
const server = express();

require('dotenv').config();

const router = require('./routes');

mongoose.connect(process.env.URL, 
                {useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true
                });

server.use(express.json());
server.use(router);

server.listen(3000);