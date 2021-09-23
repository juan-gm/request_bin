CREATE TABLE bin (
  id serial UNIQUE NOT NULL PRIMARY KEY,
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
  bin_id int NOT NULL,
  raw_body jsonb,
  raw_headers jsonb NOT NULL,
  query_string jsonb,
  post_parameters jsonb,
  path_string char(25) NOT NULL,
  request_timestamp timestamp NOT NULL,
  method char(10) NOT NULL,
  CONSTRAINT fk_bin
    FOREIGN KEY(bin_id)
      REFERENCES bin(id)
);