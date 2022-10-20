var pg_connect = require('./pg_connect');
const { values } = require("pg/lib/native/query");


// products
async function display_products(shopId) {
  // define query

  var productsQuery;

  if (shopId == 0) {
    productsQuery = `SELECT * FROM products`;
  }
  else {
    productsQuery = {
      text: 'SELECT * FROM products WHERE shop_id = $1',
      values: [shopId]
    }
  }

  // query data
  const data = await pg_connect.query(productsQuery);
  // pg_connect.end();

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
  //--- display all header of table
  let num_fields = data.fields.length;
  for (let i = 0; i < num_fields; i++) {
    table_string += `<td>${data.fields[i].name}</td>`;
  }
  table_string += `</tr>`;

  //--- display all rows of table 
  let num_rows = data.rows.length;
  for (let i = 0; i < num_rows; i++) {
    table_string += `<tr>`;
    for (let j = 0; j < num_fields; j++) {
      let field_name = data.fields[j].name;
      let cell = data.rows[i][field_name];
      table_string += `<td>${cell}</td>`;
    }
    // add row
    table_string += `</tr>`;
  }


  table_string += `</table>`;
  // console.log(data);
  return table_string;
}

// export tables
module.exports = display_products;