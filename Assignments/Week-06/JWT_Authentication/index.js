const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT_NUMBER = 4006;
app.use(express.json());
const JWT_SECERET = "learningnodejs";
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "token"],
  })
);
let userDetails = [];

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decodedInformationToken = jwt.verify(token, JWT_SECERET);
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);
    console.log(decodedInformationToken, "username");
    req.decodedInformationToken = decodedInformationToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

app.post("/signup", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  userDetails.push({
    userName: userName,
    password: password,
  });

  res.status(200).json({
    message: "user added successfully",
  });
});

app.post("/signin", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  const user = userDetails.find(
    (u) => u.userName === userName && u.password === password
  );
  if (user) {
    const token = jwt.sign(
      {
        userName: userName,
      },
      JWT_SECERET
    );
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "No user found",
    });
  }
});

app.get("/userdetails", auth, (req, res) => {
  const userName = req.decodedInformationToken.userName;
  console.log(userName);
  const user = userDetails.find((u) => u.userName === userName);

  if (user) {
    res.status(200).json({
      message: "User found",
      userDetails: userDetails,
    });
  } else {
    res.status(401).status({
      message: "No user found",
    });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`App is running on PORT_NUMBER ${PORT_NUMBER}`);
});
