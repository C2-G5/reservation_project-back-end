const {Pool} = require("pg");

const pool = new Pool({
    user: 'postgres',
    password:"6433",
    host: 'localhost',
    port: 6433,
    database: 'Hotel',

})
// const pool = new Pool({
//     user: 'drobi',
//     password:"x2doZ4PeadbA8ClSpXAGHbX9HUB2YeXx",
//     host: 'dpg-chs8aaorddl7at9juf90-a.oregon-postgres.render.com',
//     port: 5432,
//     database: 'hotel_booking',

// })


module.exports = pool;