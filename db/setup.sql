DROP TABLE IF EXISTS bin CASCADE;
DROP TABLE IF EXISTS parsed_request CASCADE;

CREATE TABLE bin (
  id serial UNIQUE NOT NULL PRIMARY KEY,
  path char(30) UNIQUE NOT NULL,
  last_used date
);

CREATE TABLE parsed_request (
  id serial UNIQUE NOT NULL PRIMARY KEY,
  bin_id int NOT NULL,
  raw_body varchar,
  raw_headers varchar NOT NULL,
  query varchar,
  path char(40) NOT NULL,
  request_timestamp timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  method char(10) NOT NULL,
  CONSTRAINT fk_bin
    FOREIGN KEY(bin_id)
      REFERENCES bin(id)
);
