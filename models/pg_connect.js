const Pool = require('pg').Pool
const pg_con = new Pool({
    user: 'cguvtcscnfevne',
    host: 'ec2-54-225-234-165.compute-1.amazonaws.com',
    database: 'd64uuk9ujsmrmd',
    password: '6557d96394f57fc45815139a0646bbc49cfd9a5d4052bee4e77c1890b688af3e',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = pg_con;