const {Pool} = require('pg')
const dotenv = require('dotenv')
dotenv.config();
const user = process.env.DBUSERNAME;
const pwd = process.env.DBPASSWORD;
const host = process.env.HOST;
const port =  process.env.DBPORT;

const pool = new Pool({
    user: user,
    password:pwd,
    host:host,
    port: port,
    database: 'kossaem'
})

module.exports = pool