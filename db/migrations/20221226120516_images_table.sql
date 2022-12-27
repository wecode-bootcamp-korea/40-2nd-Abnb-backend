-- migrate:up
CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(2000) NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);
-- migrate:down
DROP TABLE images;