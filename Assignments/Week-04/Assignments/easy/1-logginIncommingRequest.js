const express = require("express");

const app = express();
app.use(express.json());
// Console all the incoming request from the api

// Middleware
function logIncomingREquest(req, res, next) {
  const result = req.body;
  if (result && Object.keys(result).length > 0) {
    console.log(result);
    next();
  } else {
    res.status(404).json({
      message: "Please send the user data in json format",
    });
  }
}

app.post("/getUserDetails", logIncomingREquest, (req, res) => {
  res.status(200).json({
    message: "User Data received successfully in correct format",
  });
});

const PORT_NUMBER = 4004;
app.listen(PORT_NUMBER, () => {
  console.log(`App is running on PORT_NUMBER : `, PORT_NUMBER);
});
