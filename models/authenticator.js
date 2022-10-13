var pg_con = require('./pg_connect')
async function authen(user, pass) {
    var authenticated = false;
    const auth_query = {
        text: 'SELECT * FROM users WHERE name = $1 AND password = $2',
        values: [user, pass]
    };
    var query_data = await pg_con.query(auth_query);
    if (query_data.rows.length == 1) {
        authenticated = true;
    }
    console.log(authenticated);
    return authenticated;

}
module.exports = authen;