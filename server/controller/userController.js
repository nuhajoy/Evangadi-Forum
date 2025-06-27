const express = require("express");
// db connection
const dbconnection = require("../db/dbconfig.js");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

// controller for registration

async function register(req, res) {
  const { user_name, first_name, last_name, email, password } = req.body;

  if (!user_name || !first_name || !last_name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
     
      message: "All fields are required",
    });
  }
  try {
    // check if user already exists
    const [user] = await dbconnection.query(
      "SELECT user_name, user_id FROM usertable WHERE user_name = ? OR email = ?",
      [user_name, email]
    )
      if (user.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "User already exists ",
        });
    }
    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Password must be at least 8 characters long",
      });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    await dbconnection.execute(
      "INSERT INTO usertable (user_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [user_name, first_name, last_name, email, hashedPassword])
    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
    }
    );
    
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Something went wrong , please try again later",
    });
    
  }
}

// controller for login

async function login(req, res) {
  // res.send("login user");

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      
      message: "Email and password are required",
    });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT user_name,user_id,password FROM usertable WHERE email = ?",
      [email]
    );
    //  return res.json(users);

    if (user.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid email or password",
      });
    }
    // else {
    //   res.json("user existed");
    // }

    // compare the password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid credentials",
      });
    }
    const user_name = user[0].user_name;
    const user_id = user[0].user_id;

    const token = jwt.sign({ user_name, user_id }, process.env.JWT_SECRET, { expiresIn: "1d" }) 
    
    return res.status(StatusCodes.OK).json({
      message: " user Login successful",
      token,user_name
    });
    
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Something went wrong , please try again later",
    });
    
  }
}

// controller for checking
async function checkUser(req, res) {

  const user_name = req.user.user_name;
  const user_id = req.user.user_id;

  res.status(StatusCodes.OK).json({msg:"valid user", user_name, user_id})
  // res.send("check user");
}

module.exports = { register, login, checkUser };
