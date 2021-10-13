const Cryptr = require("cryptr");
const cryptr = new Cryptr("hellp");

exports.encrypt = function (email) {
  const encryptedString = cryptr.encrypt(email);
  return encryptedString;
};

exports.decrypt = function (hash) {
  const email = cryptr.decrypt(hash);
  return email;
};