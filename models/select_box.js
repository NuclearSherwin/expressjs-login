var pg_connect = require('./pg_connect');


async function gen_box() {

    // query
    let queryCommand = `SELECT shops.id, shops.name, users.roles
    FROM shops JOIN users ON shops.id = users.shop_id`;

    const data = await pg_connect.query(queryCommand);

    let box_string =
        `<form method='post' action="select_box">
            <label for="shop">Choose a shop:</label>
                <select name="shop" id="shop_id">
                    <option name="allShop" value="0" selected>All shops</option>
        `
    let select_item = data.rows.length;
    for (let i = 0; i < select_item; i++) {
        if (data.rows[i].roles != "admin") {
            box_string += `<option value=${data.rows[i].id}>${data.rows[i].name}</option>`;
        }
    }

    box_string += `</select>
        <input type="submit" value="view">
        </form>
    `
    console.log(data);
    return box_string;

}

module.exports = gen_box;