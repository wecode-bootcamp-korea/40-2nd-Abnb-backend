const jwt = require("jsonwebtoken");
require("dotenv").config();
const userDao = require("../models/userDao");
const axios = require("axios");

const login = async (kakaoToken) => {
  try {
    const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        authorization: `Bearer ${kakaoToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const kakaoId = kakaoUserInfo.data.id;
    const profileImage = kakaoUserInfo.data.properties.profile_image || null;
    const name = kakaoUserInfo.data.properties.nickname || null;
    const email = kakaoUserInfo.data.kakao_account.email;
    const user = await userDao.getUserByKakaoId(kakaoId);
    4;

    if (!user) {
      await userDao.createUser(kakaoId, profileImage, name, email);
      const accessToken = jwt.sign({ userId: kakaoId }, process.env.JWT_SECRET);
      return accessToken;
    }

    const accessToken = jwt.sign({ userId: kakaoId }, process.env.JWT_SECRET);

    return accessssToken;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  login,
};
