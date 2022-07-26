const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;
const pool = require('./server/config/db.js');

/*Test Hello World - go ka sa 127.0.0.1:3000 para makita mo ito*/
app.get('/',(req, res)=>{
    res.send('Hello World');
});


//Port Listening
app.listen(port,()=>{
    console.log(pool.connect());
    console.log(`Now listening on port: ${port}`); 
})

