const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const cors = require("cors");
const { UserModel, TodoModel } = require("./Db");
const { auth, JWT_SECRET } = require("./auth");
const mongoose = require("mongoose");
const app = express();
mongoose.connect(
  "mongodb+srv://ashishsinghk2020:uaqSQU6jgIcMPcBP@cluster0.2gwff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "token"],
  })
);
app.use(express.json());

const PORT_NUMBER = 4005;

app.post("/signup", async function (req, res) {
  const userBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(100),
    name: z.string().min(3).max(100),
  });

  //   we should use safeParse because it does not break the code. Parse breaks the code
  const parseData = userBody.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({
      message: "Incorrect Details",
      error: parseData.error,
    });
    return;
  }
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

app.post("/createtodo", auth, async function (req, res) {
  console.log("user verified");
  const userID = req.userId;
  const title = req.body.title;
  const description = req.body.description;
  const done = req.body.done;
  console.log(req.body);
  await TodoModel.create({
    userId: userID,
    title: title,
    description: description,
    done: done,
  });

  res.status(200).json({
    message: "Todo Added Successfuly",
  });
});

app.get("/fetchtodos", auth, async function (req, res) {
  const userID = req.userId;
  try {
    const getUsersTodo = await TodoModel.find({ userId: userID });
    res.status(200).json({
      message: "All Todos Fetched Successfully",
      usertodos: getUsersTodo,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
});

app.post("/markdone", auth, async function (req, res) {
  const userID = req.userId;
  const todoId = req.body.todoId;
  const done = req.body.done;

  try {
    const updateTodo = await TodoModel.findOneAndUpdate(
      {
        _id: todoId,
        userId: userID,
      },
      { done: done },
      { new: true } // this will return the updated list of todos
    );
    if (!updateTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }
    res.status(200).json({
      message: "Todo status updated successfully",
      todo: updateTodo,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error updating todo status",
      error: error.message,
    });
  }
});

app.delete("/deletodo", auth, async function (req, res) {
  const userID = req.userId;
  const todoId = req.body.todoId;

  const deleteTodo = await TodoModel.deleteOne({
    _id: todoId,
    userId: userID,
  });

  if (!deleteTodo) {
    res.status(403).json({
      message: "There is Problem in deleting the todo",
    });
  } else {
    res.status(200).json({
      message: "Todo Deleted Successfully",
    });
  }
});

app.patch("/updatetodo", auth, async function (req, res) {
  const userID = req.userId;
  const todoId = req.body.todoId;
  const description = req.body.description;

  const updateTodo = await TodoModel.findOneAndUpdate(
    {
      _id: todoId,
      userId: userID,
    },
    { description: description },
    { new: true }
  );

  if (!updateTodo) {
    res.status(403).json({
      message: "No Todo Found || There is problem in deleting the todo",
    });
  } else {
    res.status(200).json({
      message: "Todo Updated Successfully",
      updatedTodo: updateTodo,
    });
  }
});
app.listen(PORT_NUMBER, () => {
  console.log(`Server is up and running on PORT_NUMBER ${PORT_NUMBER}`);
});
