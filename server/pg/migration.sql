DROP TABLE IF EXISTS users,nmc_blocks;

CREATE TABLE IF NOT EXISTS users(
	id serial not null PRIMARY KEY,
	email varchar(100) UNIQUE,
	password varchar(100),
	created_at timestamp default current_timestamp,
	updated_at timestamp
);

CREATE INDEX email_idx on users(email text_pattern_ops);


CREATE TABLE IF NOT EXISTS nmc_blocks(
  id serial not null PRIMARY KEY,
  name text UNIQUE,
  value js,
  txid varchar(250),
  height integer,
  address varchar(100),
  expires_in integer,
  expired boolean,
  created_at timestamp default current_timestamp,
  updated_at timestamp
);

CREATE INDEX name_idx on nmc_blocks(name text_pattern_ops); --index for searching, also does matching
CREATE INDEX txid_idx on nmc_blocks(txid text_pattern_ops); --index for searching, also does matching
CREATE INDEX address_idx on nmc_blocks(address text_pattern_ops); --index for searching, also does matching
CREATE INDEX value_idx on nmc_blocks(value text_pattern_ops); --index for searching, also does matching

CREATE OR REPLACE FUNCTION set_updated_timestamp()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_timestamp --is there a better syntax for this
  BEFORE INSERT OR UPDATE ON nmc_blocks
  FOR EACH ROW EXECUTE PROCEDURE set_updated_timestamp();

CREATE TRIGGER update_timestamp
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE set_updated_timestamp();  --Not most efficient but takes up very few lines