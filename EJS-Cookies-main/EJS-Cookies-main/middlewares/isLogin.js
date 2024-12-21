const User = require("../model/user.model");

const isLogin = async (req, res, next) => {
  const { username, email } = req.cookies;

  const isEmail = await User.findOne({ email: email });

  if (isEmail) {
    next();
  } else {
    return res.json({ message: "Please login first" });
  }
};

module.exports = isLogin;
