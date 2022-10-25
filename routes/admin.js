var express = require('express');
var router = express.Router();
var gen_box = require('../models/select_box');
var display_products = require('../models/table_display');
var router = express.Router();
var session;

/* GET home page. */
router.get('/', async function (req, res, next) {
    session = req.session;
    let shopId = session.shopId;
    let username = session.user_id;

    let box_string = await gen_box();
    let table = await display_products(shopId);

    res.render('admin', {
        title: 'Welcome [ Admin ] to ATN-SHOP',
        name: username,
        select_box: box_string,
        table_string: table,
    });
});

// display for each shop
router.post('/select_box', async function (req, res, next) {
    let shop_id = req.body.shopId;
    let username = req.session.user_id;
    console.log("VALUE: " + shop_id);
    let box_string = await gen_box();
    let table = await display_products(shop_id);

    res.render('admin', {
        title: 'welcome to ATN SHOP',
        name: username,
        select_box: box_string,
        table_string: table,
    });
});

module.exports = router;
