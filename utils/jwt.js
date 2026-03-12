const jwt = require("jsonwebtoken");

const SECRET_KEY = "super_secret_key_change_this";

function generateToken(user) {

  return jwt.sign(
    {
      playerCode: user.playerCode,
      email: user.email
    },
    SECRET_KEY,
    { expiresIn: "7d" }
  );

}

function verifyToken(token) {

  try {

    return jwt.verify(token, SECRET_KEY);

  } catch (err) {

    return null;

  }

}

module.exports = {
  generateToken,
  verifyToken
};
