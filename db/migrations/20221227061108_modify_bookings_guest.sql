-- migrate:up
ALTER TABLE bookings CHANGE guest_num guest_number INT NOT NULL; 

-- migrate:down

