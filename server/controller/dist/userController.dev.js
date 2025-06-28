"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require("express"); // db connection


var dbconnection = require("../db/dbconfig.js");

var bcrypt = require("bcrypt");

var _require = require("http-status-codes"),
    StatusCodes = _require.StatusCodes;

require("dotenv").config();

var jwt = require("jsonwebtoken"); // controller for registration


function register(req, res) {
  var _req$body, user_name, first_name, last_name, email, password, _ref, _ref2, user, salt, hashedPassword;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user_name = _req$body.user_name, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, password = _req$body.password;

          if (!(!user_name || !first_name || !last_name || !email || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "All fields are required"
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(dbconnection.query("SELECT user_name, user_id FROM userTable WHERE user_name = ? OR email = ?", [user_name, email]));

        case 6:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          user = _ref2[0];

          if (!(user.length > 0)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "User already exists "
          }));

        case 11:
          if (!(password.length < 8)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Password must be at least 8 characters long"
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 15:
          salt = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 18:
          hashedPassword = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(dbconnection.execute("INSERT INTO userTable (user_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)", [user_name, first_name, last_name, email, hashedPassword]));

        case 21:
          return _context.abrupt("return", res.status(StatusCodes.CREATED).json({
            message: "User registered successfully"
          }));

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0.message);
          return _context.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Something went wrong , please try again later"
          }));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 24]]);
} // controller for login


function login(req, res) {
  var _req$body2, email, password, _ref3, _ref4, user, isMatch, user_name, user_id, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // res.send("login user");
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Email and password are required"
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(dbconnection.query("SELECT user_name,user_id,password FROM userTable WHERE email = ?", [email]));

        case 6:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          user = _ref4[0];

          if (!(user.length === 0)) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid email or password"
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user[0].password));

        case 13:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid credentials"
          }));

        case 16:
          user_name = user[0].user_name;
          user_id = user[0].user_id;

          if (process.env.JWT_SECRET) {
            _context2.next = 21;
            break;
          }

          console.error("JWT_SECRET is missing!");
          return _context2.abrupt("return", res.status(500).json({
            message: "Server misconfiguration: missing JWT secret."
          }));

        case 21:
          token = jwt.sign({
            user_name: user_name,
            user_id: user_id
          }, process.env.JWT_SECRET, {
            expiresIn: "1d"
          });
          return _context2.abrupt("return", res.status(StatusCodes.OK).json({
            message: " user Login successful",
            token: token,
            user_name: user_name
          }));

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](3);
          console.log("Login request body:", req.body);
          console.error(_context2.t0.message);
          return _context2.abrupt("return", res.status(500).json({
            message: "Something went wrong , please try again later"
          }));

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 25]]);
} // controller for checking


function checkUser(req, res) {
  var user_name, user_id;
  return regeneratorRuntime.async(function checkUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user_name = req.user.user_name;
          user_id = req.user.user_id;
          res.status(StatusCodes.OK).json({
            msg: "valid user",
            user_name: user_name,
            user_id: user_id
          }); // res.send("check user");

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  register: register,
  login: login,
  checkUser: checkUser
};