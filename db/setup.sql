DROP TABLE IF EXISTS bin CASCADE;
DROP TABLE IF EXISTS raw_request CASCADE;
DROP TABLE IF EXISTS parsed_request CASCADE;

CREATE TABLE bin (
  id serial UNIQUE NOT NULL PRIMARY KEY,
  path char(30) UNIQUE NOT NULL,
  last_used date
);

CREATE TABLE raw_request (
  id serial UNIQUE NOT NULL PRIMARY KEY,
  bin_id int NOT NULL,
  raw_data jsonb NOT NULL,
    CONSTRAINT fk_bin
      FOREIGN KEY(bin_id)
        REFERENCES bin(id)
);

CREATE TABLE parsed_request (
  id serial UNIQUE NOT NULL PRIMARY KEY,
  raw_request_id int NOT NULL,
  raw_body jsonb NOT NULL,
  raw_headers jsonb NOT NULL,
  query_string jsonb,
  post_parameters jsonb,
  path_string char(40) NOT NULL,
  request_timestamp timestamp NOT NULL,
  method char(10) NOT NULL,
  CONSTRAINT fk_raw_request_id
    FOREIGN KEY(raw_request_id)
      REFERENCES raw_request(id)
);