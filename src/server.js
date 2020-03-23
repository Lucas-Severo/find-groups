const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();

server.use(cors());
require('dotenv').config();

const router = require('./routes');

mongoose.connect(process.env.URL, 
                {useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true
                });

server.use(express.json());
server.use(router);

server.listen(process.env.PORT || 3000);