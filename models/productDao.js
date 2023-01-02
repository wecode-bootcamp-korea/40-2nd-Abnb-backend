const { appDataSource } = require('./data-source');

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
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};
module.exports = {
  createBooking,
  getProductById,
};
