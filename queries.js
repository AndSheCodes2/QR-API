var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/sec_filings';
var db = pgp(connectionString);

function getAllFilings(req, res, next) {
  var per_page= req.query.results_per_page || 25
  var results = {
    results_per_page: per_page
  }

  db.task(function(t){
    if (req.query.hasOwnProperty('cik')){
      query = `with
        filings as ( select id, external_id, cik, schema_version, type, symbol, name, period from filings where cik = $1  ),
        owners as ( select document_id, name, director, street_1, street_2, city, postal, state from owners where document_id in ( select distinct id from filings ) ),
        trans_info as ( select document_id, form_type, code, equity_swap, shares, price_per_share, acquired_disposed_code from transactional_info where document_id in ( select distinct id from filings ) )
        select
          f.external_id, f.cik, f.type, f.symbol, f.name, f.period,
          ( select row_to_json(t) from ( select o.name, o.street_1, o.street_2, o.city, o.state, o.postal, o.state, o.director ) t ) as owner,
          ( select row_to_json(t) from ( select t.form_type, t.code, t.equity_swap, t.shares, t.price_per_share, t.acquired_disposed_code ) as t ) as trans,
          ( select json_agg(row_to_json(t)) from ( select * from footnotes ) t ) as notes
        from filings f
        inner join owners o on o.document_id = f.id
        inner join trans_info t on t.document_id = f.id
        order by symbol asc
        limit ${per_page}`
      return t.any(query,req.query.cik)
        .then(filings => {
          results.filings = filings
          return t.one("select count(*) from filings where cik = $1",req.query.cik)
            .then(total => {
              results.total_filings = total.count
              results.total_pages   = Math.ceil(total.count/per_page)
              return
            })
        })
    }else if (req.query.hasOwnProperty('symbol')){
      query = `with
        filings as ( select id, external_id, cik, schema_version, type, symbol, name, period from filings where symbol = $1),
        owners as ( select document_id, name, director, street_1, street_2, city, postal, state from owners where document_id in ( select distinct id from filings ) ),
        trans_info as ( select document_id, form_type, code, equity_swap, shares, price_per_share, acquired_disposed_code from transactional_info where document_id in ( select distinct id from filings ) )
        select
          f.external_id, f.cik, f.type, f.symbol, f.name, f.period,
          ( select row_to_json(t) from ( select o.name, o.street_1, o.street_2, o.city, o.state, o.postal, o.state, o.director ) t ) as owner,
          ( select row_to_json(t) from ( select t.form_type, t.code, t.equity_swap, t.shares, t.price_per_share, t.acquired_disposed_code ) as t ) as trans,
          ( select json_agg(row_to_json(t)) from ( select * from footnotes ) t ) as notes
        from filings f
        inner join owners o on o.document_id = f.id
        inner join trans_info t on t.document_id = f.id
        order by symbol asc
        limit ${per_page}`
      return t.any(query,req.query.symbol)
        .then(filings => {
          results.filings = filings
          return t.one("select count(*) from filings where symbol = $1",req.query.symbol)
            .then(total => {
              results.total_filings = total.count
              results.total_pages   = Math.ceil(total.count/per_page)
              return
            })
        })
    }else{
      query = `with
        filings as ( select id, external_id, cik, schema_version, type, symbol, name, period from filings ),
        owners as ( select document_id, name, director, street_1, street_2, city, postal, state from owners where document_id in ( select distinct id from filings ) ),
        trans_info as ( select document_id, form_type, code, equity_swap, shares, price_per_share, acquired_disposed_code from transactional_info where document_id in ( select distinct id from filings ) )
        select
          f.external_id, f.cik, f.type, f.symbol, f.name, f.period,
          ( select row_to_json(t) from ( select o.name, o.street_1, o.street_2, o.city, o.state, o.postal, o.state, o.director ) t ) as owner,
          ( select row_to_json(t) from ( select t.form_type, t.code, t.equity_swap, t.shares, t.price_per_share, t.acquired_disposed_code ) as t ) as trans,
          ( select json_agg(row_to_json(t)) from ( select * from footnotes ) t ) as notes
        from filings f
        inner join owners o on o.document_id = f.id
        inner join trans_info t on t.document_id = f.id
        order by symbol asc
        limit ${per_page}`
      return t.any(query)
        .then(filings => {
          results.filings = filings
          return t.one("select count(*) from filings")
            .then(total => {
              results.total_filings = total.count
              results.total_pages   = Math.ceil(total.count/per_page)
              return
            })
        })
    }
  })
    .then(function(data){
      res.status(200)
        .json(results)
    })
    .catch(function (err){
      return next(err);
    })
}

function getSingleFiling(req, res, next) {
  var filingID = req.params.filing_id;
  var results  = {};
  db.task(function(t){
    return t.one("select exists(select 1 from filings where external_id = $1)",filingID)
      .then(exists => {
        if (exists.exists){
          query = `with
          filings as ( select id, external_id, cik, schema_version, type, symbol, name, period from filings where external_id = $1),
          owners as ( select document_id, name, director, street_1, street_2, city, postal, state from owners where document_id in ( select distinct id from filings ) ),
          trans_info as ( select document_id, form_type, code, equity_swap, shares, price_per_share, acquired_disposed_code from transactional_info where document_id in ( select distinct id from filings ) )
          select
            f.external_id, f.cik, f.type, f.symbol, f.name, f.period,
            ( select row_to_json(t) from ( select o.name, o.street_1, o.street_2, o.city, o.state, o.postal, o.state, o.director ) t ) as owner,
            ( select row_to_json(t) from ( select t.form_type, t.code, t.equity_swap, t.shares, t.price_per_share, t.acquired_disposed_code from trans_info t where t.document_id = f.id) as t ) as trans,
            ( select json_agg(row_to_json(t)) from ( select * from footnotes ) t ) as notes
          from filings f
          inner join owners o on o.document_id = f.id`
          return t.one(query,filingID)
            .then(function(data){
              return results = data
            })
            .catch(function(err){
              res.status(500)
                .json({ error: 'Unknown exception' })
            })
        }else{
          res.status(404)
            .json({ error: 'Invalid filing_id'})
        }
      })
      .catch(function(err){
        res.status(500)
          .json({ error: 'Unknown exception' })
      })
  })
    .then(function(data){
      res.status(200)
        .json(results)
    })
    .catch(function(err){
      return next(err)
    })
}

function getCorporations(req, res, next){
  db.any('select now()')
    .then(function (data){
      res.status(200)
        .json({ status: 'Ok' })
    })
    .catch(function (err){
      return next(err)
    })
}

function getCorporation(req, res, next){
  db.any('select now()')
    .then(function (data){
      res.status(200)
        .json({ status: 'Ok'})
    })
    .catch(function (err){
      return next(err)
    })
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
  getStatus: getStatus,
  getCorporations: getCorporations,
  getCorporation: getCorporation
};
