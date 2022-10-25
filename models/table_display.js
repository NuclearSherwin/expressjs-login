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

.insert-button {
  background-color: #4dff00;
}

.edit-button {
  background-color: #e8ff00;
}

.delete-button {
  background-color: #ff0032;
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
red
<table>
  <tr>`;
  //--- display all header of table
  let num_fields = data.fields.length;
  for (let i = 0; i < num_fields; i++) {
    table_string += `<td>${data.fields[i].name}</td>`;
  }
  table_string += `<th>Action</th>`;
  table_string += `</tr>`;

  //--- display all rows of table 
  let num_rows = data.rows.length;
  for (let i = 0; i < num_rows; i++) {
    table_string += `
      <form action="crud" method="post">
        <tr>`;
    for (let j = 0; j < num_fields; j++) {
      let field_name = data.fields[j].name;
      let cell = data.rows[i][field_name];
      table_string += `<td><input type='text' name=${field_name} value=${cell}></td>`;
    }


    // add buttons
    table_string += `<td>
      <button type="submit" class="edit-button" value='edit'>Edit</button>
      <button type="submit" class="delete-button" value='delete'>Delete</button>
    </td>`;

    table_string += `</tr></form>`;
  }

  // add form submit for insert
  table_string += `<form action="/user/crud" method="post"><tr>`
  for (let j = 0; j < num_fields; j++) {
    let field_name = data.fields[j].name;
    table_string += `<td><input type='text' name=${field_name}></td>`;
  }

  table_string += `<td>
    <button type="submit" name='crud' value='insert'>Insert</button>
  </td>`;

  table_string += `</tr></form>`;

  table_string += `</table>`;
  // console.log(data);
  return table_string;
}

// export tables
module.exports = display_products;