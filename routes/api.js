var express = require('express');
var router  = express.Router();

var db = require('../queries');

router.get('/filings', db.getAllFilings);

router.get('/filings/:filing_id', db.getSingleFiling);

router.get('/corps', db.getCorporations);

router.get('/corps/:cik', db.getCorporation);

router.get('/', function(req, res, next){
  res.status(200)
    .json({ message: 'Welcome to QR' });
})

module.exports = router;
