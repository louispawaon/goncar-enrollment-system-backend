const {Pool} = require('pg');
require('dotenv').config();

const {DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT} = process.env;

/*const pool=new Pool({
    connectionString: process.env.DATABASE_URL
});*/

/*dira sa for now ang connection strings kay for some reason dile mugana sa env*/

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'gsta-enrollment-system-backend',
    password: 'chimy123Changas',
    port: 2009
});

pool.on('connect',()=>{
    console.log('connected to db');
});

module.exports = pool;