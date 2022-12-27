const userServices = require('../services/userServices');

const login = async (req, res) => {
  try {
    const kakaoToken = req.headers.authorization;

    if (!kakaoToken) {
      return res.status(400).json({ message: 'NEED_ACCESS_TOKEN' });
    }

    const accessToken = await userServices.login(kakaoToken);
    return res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  login,
};
