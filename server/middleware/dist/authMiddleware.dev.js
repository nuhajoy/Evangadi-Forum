"use strict";

var _require = require("http-status-codes"),
    StatusCodes = _require.StatusCodes;

require("dotenv").config();

var jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  var authHeader, token, _jwt$verify, user_name, user_id;

  return regeneratorRuntime.async(function authMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers.authorization; // Check if the user is authenticated

          if (!(!authHeader || !authHeader.startsWith("Bearer "))) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Authentication invalid"
          }));

        case 3:
          token = authHeader.split(" ")[1]; // console.log(authHeader)
          // console.log(token)
          // Verify the token using jwt.verify

          _context.prev = 4;
          _jwt$verify = jwt.verify(token, process.env.JWT_SECRET), user_name = _jwt$verify.user_name, user_id = _jwt$verify.user_id; // If the token is valid, attach user information to the request object

          req.user = {
            user_name: user_name,
            user_id: user_id
          }; // If the user is authenticated, proceed to the next middleware or route handler

          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Authentication invalid"
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
}

module.exports = authMiddleware;