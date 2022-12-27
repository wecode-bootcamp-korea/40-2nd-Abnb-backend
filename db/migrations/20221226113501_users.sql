-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL ,
  kakao_id BIGINT(30) NULL,
  name VARCHAR(10) NOT NULL,
  profile_image VARCHAR(100) NULL,
  phone_num VARCHAR(11) NULL,
  birth_date VARCHAR(15) NULL,
  password BINARY(60) NULL,
  user_type_id INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (user_type_id) REFERENCES user_types(id)
);

-- migrate:down
DROP TABLE users;