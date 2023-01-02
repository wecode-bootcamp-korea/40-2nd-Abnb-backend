const { appDataSource } = require("./data-source");

const getUserByKakaoId = async (id) => {
  try {
    const [result] = await appDataSource.query(
      `
    SELECT
        u.id
    FROM 
        users u
    WHERE
        u.kakao_id = ?
    `,
      [id]
    );
    return result.id;
  } catch (err) {
    console.log(err);
    const error = new Error("DATABASE_ERROR");
    error.statusCode = 500;
    throw error;
  }
};

const createUser = async (id, image, name, email) => {
  try {
    return await appDataSource.query(
      `
    INSERT INTO users (
      kakao_id,
      email,
      name,
      profile_image
    ) VALUES (
      ?, ?, ?, ?
    )
    `,
      [id, email, name, image]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DATABASE_ERROR");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getUserByKakaoId,
  createUser,
};
