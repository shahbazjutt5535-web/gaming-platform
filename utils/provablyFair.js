const crypto = require("crypto");

function generateServerSeed() {

  return crypto.randomBytes(32).toString("hex");

}

function hashServerSeed(seed) {

  return crypto.createHash("sha256").update(seed).digest("hex");

}

function generateRoll(serverSeed, clientSeed, nonce) {

  const combined = serverSeed + clientSeed + nonce;

  const hash = crypto
    .createHash("sha256")
    .update(combined)
    .digest("hex");

  const number = parseInt(hash.substring(0, 8), 16);

  return number % 100;

}

module.exports = {
  generateServerSeed,
  hashServerSeed,
  generateRoll
};
