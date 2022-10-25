var express = require('express');
const { DatabaseError } = require('pg');
var display_products = require('../models/table_display');
var router = express.Router();
var gen_box = require('../models/select_box');
var crud = require('../models/crud');
var session;

/* GET users listing. */
router.get('/', async function (req, res, next) {
  session = req.session;
  if (session.user_id) {
    let username = session.user_id;
    let shopId = session.shopId;

    let table = await display_products(shopId);
    res.render('users', {
      title: 'welcome to ATN-SHOP',
      name: username,
      table_string: table,
    });
  }
  else {
    res.render('login', {
      title: 'ATN SHOP Login',
      message: 'Please login first!'
    });
  }
});

router.post('/crud', async (req, res, next) => {
  session = req.session;
  console.log(session);
  // update
  console.log(req.body);
  let results = await crud(req.body);
  console.log(results);
  // refresh the page
  let table = await display_products(req.body.shop_id);
  res.render('users', {
    title: 'ATN Admin',
    name: session.user_id,
    table_string: table
  });
});




module.exports = router;
