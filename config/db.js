require('dotenv').config();
const mysql = require('mysql');


const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    debug:false
});


const connectDB = async () => {
    await con.query('SELECT 1 + 1 AS solution', function (error) {
        if (error) throw error;
        console.log('Database connected ');
    });
};


module.exports = { connectDB, con };