"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dbConnection = require("../db/dbconfig");

var _require = require("http-status-codes"),
    StatusCodes = _require.StatusCodes;

function postQuestion(req, res) {
  var user_name, user_id, _req$body, title, content, _ref, _ref2, result;

  return regeneratorRuntime.async(function postQuestion$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user_name = req.user.user_name; //from authMiddleware

          user_id = req.user.user_id;
          _req$body = req.body, title = _req$body.title, content = _req$body.content;

          if (!(!title || !content)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide all required fields"
          }));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(dbConnection.query("INSERT INTO questionTable (user_id, title, content)\n       VALUES (?, ?, ?)", [user_id, title, content]));

        case 8:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          result = _ref2[0];
          return _context.abrupt("return", res.status(StatusCodes.CREATED).json({
            message: "Question posted successfully."
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0.message);
          return _context.abrupt("return", res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred."
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 14]]);
}

function allQuestion(req, res) {
  var _ref3, _ref4, rows;

  return regeneratorRuntime.async(function allQuestion$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(dbConnection.query("SELECT \n         q.question_id,\n         q.title,\n         q.content,\n         u.user_name,\n         q.created_at\n       FROM \n         questionTable q\n       JOIN \n         userTable u ON q.user_id = u.user_id\n       ORDER BY \n         q.created_at DESC"));

        case 3:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];
          return _context2.abrupt("return", res.status(StatusCodes.OK).json(rows));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          return _context2.abrupt("return", res.status(StatusCodes.NOT_FOUND).json({
            message: "No questions found."
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function singleQuestion(req, res) {
  var questionId, _ref5, _ref6, rows;

  return regeneratorRuntime.async(function singleQuestion$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          questionId = req.params.question_id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(dbConnection.query("SELECT \n         q.question_id,\n         q.title,\n         q.content,\n         u.user_name,\n         q.created_at\n       FROM \n         questionTable q\n       JOIN \n         userTable u ON q.user_id = u.user_id\n       WHERE \n         q.question_id = ?", [questionId]));

        case 4:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          rows = _ref6[0];

          if (!(rows.length === 0)) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(StatusCodes.NOT_FOUND).json({
            message: "Question not found"
          }));

        case 9:
          return _context3.abrupt("return", res.status(StatusCodes.OK).json(rows[0]));

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0.message);
          return _context3.abrupt("return", res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred."
          }));

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
}

module.exports = {
  postQuestion: postQuestion,
  singleQuestion: singleQuestion,
  allQuestion: allQuestion
};