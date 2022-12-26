-- migrate:up
CREATE TABLE bookings (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    guest_id INT NOT NULL,
    guest_num INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (guest_id) REFERENCES users(id)
  );

-- migrate:down
DROP TABLE bookings;

