-- migrate:up
ALTER TABLE users ADD UNIQUE(email);
ALTER TABLE users ADD UNIQUE(kakao_id);

-- migrate:down

