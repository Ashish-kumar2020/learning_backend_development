const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./Db");
const { auth, JWT_SECRET } = require("./auth");
const mongoose = require("mongoose");
const app = express();
mongoose.connect(
  "mongodb+srv://ashishsinghk2020:uaqSQU6jgIcMPcBP@cluster0.2gwff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(express.json());

const PORT_NUMBER = 4005;

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const hashPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    email: email,
    password: hashPassword,
    name: name,
  });

  res.status(200).json({
    message: "You are now Signedup",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const userPresent = await UserModel.findOne({
    email: email,
  });

  const passwordMatch = bcrypt.compare(password, userPresent.password);
  if (userPresent && passwordMatch) {
    const token = jwt.sign(
      {
        id: userPresent._id.toString(),
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "User Successfully Logged In || Generated Token ",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "No Credential Found for this user",
    });
  }
});

app.post("/todo", auth, function (req, res) {
  console.log("user verified");
});

app.get("fetchtodos", function (req, res) {});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is up and running on PORT_NUMBER ${PORT_NUMBER}`);
});
