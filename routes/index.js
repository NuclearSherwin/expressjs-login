var express = require('express');
var router = express.Router();
var authen = require('../models/authenticator');
var pg_con = require('../models/pg_connect');
var display_products = require('../models/table_display');
var gen_box = require('../models/select_box');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  res.render('login', { title: 'ATN-SHOP', message: '' });
});

// Process for POST Request
router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  // console.log(username, password);


  let [authenticated, shopId, role] = await authen(username, password);
  console.log(authenticated);
  if (authenticated == true & role == 'storeowner') {
    // display product
    let table = await display_products(shopId);
    res.render('users', {
      title: 'welcome to ATN-SHOP',
      name: username,
      table_string: table,
    });
  }
  // for admin
  else if (authenticated == true & role == 'admin') {
    let box_string = await gen_box();
    let table = await display_products(shopId);
    res.render('admin', {
      title: 'welcome Admin to ATN-SHOP',
      name: username,
      select_box: box_string,
      table_string: table,
    });
  }
  else {
    res.render('login', {
      title: 'ATN SHOP Login',
      message: 'wrong username or password!'
    });
  }

});

// display for each shop
router.post('/select_box', async function (req, res, next) {
  let shop_id = req.body.shop;
  console.log("VALUE: " + shop_id);
  let box_string = await gen_box();
  let table = await display_products(shop_id);

  res.render('admin', {
    title: 'welcome to ATN SHOP',
    message: 'Hi',
    select_box: box_string,
    table_string: table,
  });
});

router.post('/login/shops', function (req, reks, next) {
  pg_con.connect(function (err) {
    var query = `SELECT * FROM shops`;
    pg_con.query(query, (err, data) => {
      if (err)
        console.log(err);
      else {
        console.log(data.rows);
        console.log('successfully connected to shops!')
        res.render('shops', {
          title: 'shops',
          message: 'Shops management',
          shopData: data.rows
        })
      }
    })
  })

});



module.exports = router;
