const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

//Port Listening
app.listen(port,()=>{
    console.log(`Now listening on port: ${port}`); 
})