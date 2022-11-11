const jwt = require("jsonwebtoken");

const SECRET = "tango";
// con el header(info del token) y el payload se crea el signature que es el hash de los primeros dos
const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "31d" });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
