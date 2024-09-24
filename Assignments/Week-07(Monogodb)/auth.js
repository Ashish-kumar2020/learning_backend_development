const jwt = require("jsonwebtoken");
const JWT_SECRET = "node_jwt";

function auth(req, res, next) {
  const token = req.headers.token;
  const response = jwt.verify(token, JWT_SECRET);

  if (response) {
    console.log(response);
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
}

module.exports = {
  auth,
  JWT_SECRET,
};
