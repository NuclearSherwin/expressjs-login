var pg_con = require('./pg_connect');

function showAllShops() {
    pg_con.connect();
    pg_con.query(`SELECT name FROM shops`, (err, res) => {
        if (err) {
            console.log(err.message);
        }
        console.log(res.rows);
        pg_con.end;
    })
}


module.exports = showAllShops;


