create extension "uuid-ossp";

create table filings (
  id serial primary key,
  external_id uuid,
  cik varchar(25),
  schema_version varchar(15),
  type varchar(15),
  symbol varchar(15),
  name varchar(255),
  period timestamp without time zone
);

create index on filings(cik);
create index on filings(type);
create index on filings(symbol);

create table owners (
  id serial primary key,
  document_id integer,
  name varchar(255),
  director boolean default false,
  street_1 varchar(100),
  street_2 varchar(100),
  city varchar(55),
  postal varchar(25),
  state varchar(25)
);

create index on owners(document_id);

create table transactional_info (
  id serial primary key,
  document_id integer,
  form_type integer,
  code varchar(15),
  equity_swap integer,
  shares integer,
  price_per_share numeric,
  acquired_disposed_code varchar(25)
);

create index on transactional_info(document_id);

create table footnotes (
  id serial primary key,
  document_id integer,
  note text,
  period timestamp without time zone
);

create index on footnotes(document_id);
