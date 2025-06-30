"use strict";

var express = require("express");

var reactionRoute = require("./routes/reactionRoute");

require("dotenv").config();

var app = express();
var port = process.env.PORT || 5000; // cors middleware for handling cross-origin requests

var cors = require("cors");

app.use(cors()); // db connection

var dbconnection = require("./db/dbconfig.js"); // auth middleware for protecting routes


var authMiddleware = require("./middleware/authMiddleware.js"); // json parser middleware for extracting data from request body


app.use(express.json()); // user routes middleware

var userRoute = require("./routes/userRoute.js");

app.use("/api/user", userRoute); // question routes middleware

var questionRoute = require("./routes/questionRoute.js");

app.use(express.json());
app.use("/api/question", authMiddleware, questionRoute); //  answer routes middleware

var answerRoute = require("./routes/answerRoute.js");

app.use(express.json());
app.use("/api/answer", authMiddleware, answerRoute); // reaction route middleware

app.use("/api/answer", reactionRoute);
app.get("/", function (req, res) {
  res.send("API is running...");
});

function testDbConnection() {
  var result;
  return regeneratorRuntime.async(function testDbConnection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(dbconnection.execute("select 'test' "));

        case 3:
          result = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(app.listen(port));

        case 6:
          console.log("dabase connection successful");
          console.log("listening on ".concat(port));
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

testDbConnection();