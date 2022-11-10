const { validateToken } = require("../AUTH/tokens");

 const validateRolAdmin = (token) => {
  const { user } = validateToken(token);
  console.log(user.role);
  if (user.role !== "admin") return false;
  return true;
};

module.exports = validateRolAdmin