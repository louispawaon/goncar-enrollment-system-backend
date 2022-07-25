const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/*const pool=new Pool({
    connectionString: process.env.DATABASE_URL
});*/

/*dira sa for now ang connection strings kay for some reason dile mugana sa env*/

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gsta-enrollment-system-backend',
    password: 'chimy123Changas',
    port: 2009
});

pool.on('connect',()=>{
    console.log('connected to db');
});

module.exports = pool;