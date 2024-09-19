const express = require("express");
const app = express();
const PORT_NUMBER = 4005;
app.use(express.json());

let usersDetails = [];

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  usersDetails.push({
    userName: userName,
    password: password,
  });

  res.status(200).json({
    message: "User Signup successfully",
  });
  console.log(usersDetails);
});

app.post("/signin", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  let user = usersDetails.find(
    (u) => u.userName === userName && u.password === password
  );
  if (user) {
    const token = generateToken();
    user.token = token;
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "User details not found ",
    });
  }
  console.log(usersDetails);
});

// send userdetails
app.get("/userdetails", (req, res) => {
  let token = req.headers.token;
  console.log(token);
  let user = usersDetails.find((t) => t.token == token);
  console.log(user);
  if (user) {
    res.status(200).json({
      details: user,
    });
  } else {
    res.status(403).json({
      message: "User Not found",
    });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`App is running on PORT_NUMBER ${PORT_NUMBER}`);
});
