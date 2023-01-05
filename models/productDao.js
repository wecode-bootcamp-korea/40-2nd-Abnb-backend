const { appDataSource } = require("./data-source");

const category = {
  한옥: 1,
  바다: 2,
  캠핑: 3,
};
const roomType = {
  guest: 1,
  private: 2,
  public: 3,
};
const getProductById = async (productId) => {
  const products = await appDataSource.query(
    `
    SELECT
        p.id,
        p.title,
        p.description,
        p.price,
        p.bedroom,
        p.bed,
        p.bathroom,
        p.address,
        p.maximum_guest,
        p.latitude,
        p.longtitude,
        p.created_at,
        u.profile_image,
        u.name,
        pi.image_url,
        pc.dates
        FROM 
            products p
        INNER JOIN
            users u
        ON
            p.host_id = u.id
        INNER JOIN (
            SELECT
                product_id,
                JSON_ARRAYAGG(image_url) as image_url
            FROM
                images
            GROUP BY
                product_id
        ) pi
        ON
            pi.product_id = p.id
        INNER JOIN (
            SELECT
                product_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "check_in_date", check_in_date,
                        "check_out_date", check_out_date
                    )
                ) as dates
            FROM 
                bookings
            GROUP BY
                product_id
        ) pc
        ON 
            p.id = pc.product_id
        WHERE
            p.id = ?
        `,
    [productId]
  );

  return products;
};
const createBooking = async (
  productId,
  guestId,
  guestNumber,
  checkIn,
  checkOut,
  totalPrice
) => {
  try {
    return await appDataSource.query(
      `
    INSERT INTO bookings (
      product_id,
      guest_id,
      guest_number,
      check_in_date,
      check_out_date,
      total_price
      ) 
    VALUES (
    ?, ?, ?, ?, ?, ?
    )`,
      [productId, guestId, guestNumber, checkIn, checkOut, totalPrice]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DATABASE_ERROR");
    error.statusCode = 500;
    throw error;
  }
};

const createHost = async (
  categoryId,
  roomTypeId,
  title,
  description,
  guest,
  bedroom,
  bed,
  bathroom,
  address,
  lat,
  lng,
  price,
  images
) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.startTransaction();
  console.log("category", category[categoryId]);
  console.log("roomType", roomType[roomTypeId]);
  try {
    const result = await queryRunner.query(
      `
        INSERT INTO products (
          category_id,
          room_type_id,
          latitude,
          longtitude,
          bedroom,
          maximum_guest,
          bed,
          bathroom,
          address,
          title,
          description,
          price,
          host_id
          ) 
        VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, 2
        )`,
      [
        category[categoryId],
        roomType[roomTypeId],
        lat,
        lng,
        bedroom,
        guest,
        bed,
        bathroom,
        address,
        title,
        description,
        price,
      ]
    );
    console.log("done?", result);
    console.log("done!", result.id);
    await queryRunner.query(
      `
        INSERT INTO images (
          image_url,
          product_id
          )
          VALUES ("${images[0]}", ${result.insertId}),('${images[1]}',${result.insertId}),("${images[2]}",${result.insertId}),('${images[3]}',${result.insertId}),('${images[4]}',${result.insertId})`
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createBooking,
  getProductById,
  createHost,
};
