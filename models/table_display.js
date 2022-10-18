var pg_connect = require('./pg_connect');

function display_products() {
    // query data base to get the table data
    pg_connect.connect((err) => {
        var query = 'SELECT * FROM products WHERE shop_id = 1';
        pg_connect.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                var data = result.rows;
                console.log(data);
            }
        })
    })
    let table_string = `
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>

<h2>Table products</h2>

<table>
  <tr>`;
    // display all header of table
    table_string += `</tr>`;

    // display all rows of table 
    table_string += `</table>`;

    return table_string;
}

display_products()

// export table
module.exports = display_products;