DROP TABLE IF EXISTS mines CASCADE;

CREATE TABLE mines (
    	rec_id VARCHAR NOT Null,
    	deptype VARCHAR,
	depname VARCHAR,
	country VARCHAR,
	status VARCHAR,
	latitude FLOAT,
	longitude FLOAT
);

