var pg_connect = require('./pg_connect');



async function crud(req_body) {
    // get request
    let id = req_body.id;
    let product_name = req_body.name;
    let price = req_body.price;
    let shop_id = req_body.shop_id;

    if (req_body.crud == 'edit') {
        // query updateQuery
        var query = {
            text: `UPDATE products
                SET name = $2, price = $3
                WHERE id = $1;`,
            values: [id, product_name, price]
        }

    }
    // DELETE
    else if (req_body.crud == 'delete') {
        var query = {
            text: `DELETE FROM products WHERE id = $1;`,
            values: [id]
        }

    }
    // INSERT
    else {
        var query = {
            text: `INSERT INTO products (name, price, shop_id) VALUES ($1, $2, $3)`,
            values: [product_name, price, shop_id]
        };
    }


    results = await pg_connect.query(query);

    return results;
}


module.exports = crud;