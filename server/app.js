const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;
const pool = require('./config/db.js');

//Port Listening
app.listen(port,()=>{
    console.log(pool.connect());
    console.log(`Now listening on port: ${port}`); 
})

