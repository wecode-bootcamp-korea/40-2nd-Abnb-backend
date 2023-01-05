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
        LEFT JOIN (
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

const getAllProduct = async (page) => {
  const offset = page * 8;
  try {
    return await appDataSource.query(`
    SELECT
        p.id,
        p.title,
        p.address,
        p.price,
        pi.image_url
    FROM
        products p
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
    INNER JOIN
        categories c
    ON
        c.id = p.category_id
    INNER JOIN
        room_types r
    ON
        r.id = p.room_type_id
    GROUP BY
        p.id
    LIMIT ${offset}, 8
  `);
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getProductsByQuery = async (page, queryClause) => {
  const offset = page * 8;
  try {
    return await appDataSource.query(`
    SELECT
        p.id,
        p.title,
        p.address,
        p.price,
        pi.image_url
    FROM
        products p
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
    INNER JOIN
        categories c
    ON
        c.id = p.category_id
    INNER JOIN
        room_types r
    ON
        r.id = p.room_type_id
    WHERE
        ${queryClause}
    GROUP BY
        p.id
    LIMIT ${offset}, 8
  `);
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

const getBookedProduct = async (bookingClause) => {
  return await appDataSource.query(`
  SELECT 
      product_id as id
  FROM 
      bookings
  WHERE
    ${bookingClause}
`);
};
module.exports = {
  getAllProduct,
  getProductById,
  getProductsByQuery,
  getBookedProduct,
  createBooking,
  getProductById,
};
