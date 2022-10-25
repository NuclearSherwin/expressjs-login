var express = require('express');
var router = express.Router();
var authen = require('../models/authenticator');
var pg_con = require('../models/pg_connect');
var display_products = require('../models/table_display');
var gen_box = require('../models/select_box');
var session;
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
  session = req.session;

  // console.log(username, password);


  let [authenticated, shopId, role] = await authen(username, password);
  console.log(authenticated);
  if (authenticated == true & role == 'storeowner') {
    // display product
    session.user_id = username;
    session.shopId = shopId;
    session.role = role;


    res.redirect('/users');
  }
  // for admin
  else if (authenticated == true & role == 'admin') {
    session.user_id = username;
    session.shopId = shopId;
    session.role = role;

    res.redirect('/admin');
  }
  else {
    res.render('login', {
      title: 'ATN SHOP Login',
      message: 'wrong username or password!'
    });
  }

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


// logout
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('index', { title: 'ATN SHOP' });
})




module.exports = router;
