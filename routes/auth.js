const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 5;
const { Router } = require("express");
const authRouter = Router();
const { UserModel } = require("../models/db");
const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const duplicateEmail = await UserModel.findOne({
      email: email,
    });
    if (duplicateEmail) {
      res.status(409).json({
        message: "user already exists",
      });
      return;
    }
    const hash = bcrypt.hash(password, saltRounds);
    await UserModel.create({
      name,
      email,
      passwordHash: hash,
    });
    res.status(201).json({
      message: "user created",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await UserModel.findOne({
      email: email,
    });
    if (!currentUser) {
      res.status(401).json({
        message: "Invalid creds",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(
      password,
      currentUser.passwordHash
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: currentUser._id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: "user found",
      token: token,
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = {
  authRouter: authRouter,
};
