var pg_con = require('./pg_connect')
async function authen(user, pass) {
    let authenticated = false;
    let shopId;

    const auth_query = {
        text: 'SELECT * FROM users WHERE name = $1 AND password = $2',
        values: [user, pass]
    };
    var query_data = await pg_con.query(auth_query);
    if (query_data.rowCount == 1) {
        authenticated = true;
        // take id
        shopId = query_data.rows.shop_id;
    }

    // console.log(query_data);
    return [authenticated, shopId];

}
module.exports = authen;