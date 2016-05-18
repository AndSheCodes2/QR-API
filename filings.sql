create table filings (
  id serial primary key,
  company_id integer,
  cik varchar(15),
  accession_no varchar(55),
  rec_filing date,
  created_at timestamp
);
