-- migrate:up
ALTER TABLE users modify column name VARCHAR(10);

-- migrate:down

