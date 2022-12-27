-- migrate:up
ALTER TABLE bookings CHANGE check_in check_in_date DATE NOT NULL;
ALTER TABLE bookings CHANGE check_out check_out_date DATE NOT NULL; 

-- migrate:down

