var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/filings', db.getAllFilings);
router.get('/filings/:id', db.getSingleFiling);
router.post('/filings', db.createFiling);
// router.put('/api/filings/:id', db.updateFiling);
router.delete('/filings/:id', db.removeFiling);


module.exports = router;
