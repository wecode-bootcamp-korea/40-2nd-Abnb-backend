-- migrate:up
CREATE TABLE user_types (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(20) NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE user_types;