const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT_NUMBER = 4006;
app.use(express.json());
const JWT_SECERET = "learningnodejs";

let userDetails = [];

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

app.get("/userdetails", (req, res) => {
  const token = req.headers.token;
  const decodedInformationToken = jwt.verify(token, JWT_SECERET);
  const userName = decodedInformationToken.userName;

  const user = userDetails.find((u) => u.userName == userName);
  if (user) {
    res.send({
      user: user,
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`App is running on PORT_NUMBER ${PORT_NUMBER}`);
});
