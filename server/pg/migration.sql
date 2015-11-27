DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
	id serial not null PRIMARY KEY,
	email varchar(100) UNIQUE,
	password varchar(100),
	created_at timestamp default current_timestamp,
	updated_at timestamp
);

CREATE INDEX email_idx on users(email);

CREATE OR REPLACE FUNCTION set_updated_timestamp()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_timestamp
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE set_updated_timestamp();  --Not most efficient but takes up very few lines
