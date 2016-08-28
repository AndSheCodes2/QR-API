var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/filings', db.getAllFilings);
  // cik: CIK Identifier
  // symbol: Trading Symbol
  // results_per_page: Results Per Page
  // page_number: Page Number
  // next_page
  // prev_page

router.get('/filings/:filing_id', db.getSingleFiling);
  // filing_id: FilingID ( external_id )

router.get('/cik', db.getCorporations);

router.get('/cik/:cik', db.getCorporation);
  // cik: CIK Identifer

module.exports = router;
