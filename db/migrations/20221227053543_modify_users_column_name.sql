-- migrate:up
ALTER TABLE users CHANGE phone_num phone_number VARCHAR(11);
ALTER TABLE users CHANGE birth_date birthdate VARCHAR(15);

-- migrate:down

