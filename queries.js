var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/sec_filings';
var db = pgp(connectionString);

// add query functions
function getAllFilings(req, res, next) {
  db.any('select * from filings')
    .then(function (data) {
      res.status(200)
        .json({ data: data });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleFiling(req, res, next) {
  var filingID = parseInt(req.params.id);
  db.one('select * from filings where id = $1', filingID)
    .then(function (data) {
      res.status(200)
        .json({ data: data });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createFiling(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into filings(company_id, cik, accession_no, rec_filing)' +
      'values(${company_id}, ${cik}, ${accession_no}, ${rec_filing})',
    req.body)
    .then(function () {
      res.status(201)
        .json({ });
    })
    .catch(function (err) {
      return next(err);
    });
}

// function updateFiling(req, res, next) {
//   db.none('update filings set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
//     [req.body.name, req.body.breed, parseInt(req.body.age),
//       req.body.sex, parseInt(req.params.id)])
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated filing'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

function removeFiling(req, res, next) {
  var filingID = parseInt(req.params.id);
  db.result('delete from filings where id = $1', filingID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({ });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getStatus(req, res, next) {
  db.any('select now()')
    .then(function (data) {
      res.status(200)
        .json({ status: 'Ok' });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllFilings: getAllFilings,
  getSingleFiling: getSingleFiling,
  createFiling: createFiling,
  // updateFiling: updateFiling,
  removeFiling: removeFiling,
  getStatus: getStatus
};
