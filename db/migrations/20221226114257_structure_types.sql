-- migrate:up
CREATE TABLE structure_types (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(10),
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE structure_types;
