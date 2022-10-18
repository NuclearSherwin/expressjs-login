var express = require('express');
const { DatabaseError } = require('pg');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
