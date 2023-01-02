-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(1000) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    room_type_id INT NOT NULL,
    bedroom INT NOT NULL,
    bed INT NOT NULL,
    bathroom INT NOT NULL,
    structure_type_id INT NOT NULL,
    address VARCHAR(100) NOT NULL,
    maximum_guest INT NOT NULL,
    latitude DECIMAL(17,15) NOT NULL,
    longtitude DECIMAL(17,14) NOT NULL,
    host_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES categories(id),
    FOREIGN KEY(room_type_id) REFERENCES room_types(id),
    FOREIGN KEY(structure_type_id) REFERENCES structure_types(id),
    FOREIGN KEY(host_id) REFERENCES users(id)
  );
-- migrate:down
DROP TABLE products;

