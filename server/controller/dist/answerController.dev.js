"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dbConnection = require("../db/dbconfig");

var _require = require("http-status-codes"),
    StatusCodes = _require.StatusCodes; // const authMiddleware = require("../middleware/authMiddleware");


function singleQuestion(req, res) {
  var questionId, _ref, _ref2, answers;

  return regeneratorRuntime.async(function singleQuestion$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          questionId = req.params.question_id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(dbConnection.query("\n      SELECT \n        a.answer_id,\n        a.content ,\n        u.user_name,\n        a.created_at\n      FROM \n        answerTable a\n      JOIN \n        userTable u ON a.user_id = u.user_id\n      WHERE \n        a.question_id = ?\n      ORDER BY \n        a.created_at ASC;\n    ", [questionId]));

        case 4:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          answers = _ref2[0];
          return _context.abrupt("return", res.status(StatusCodes.OK).json(answers));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0.message);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "An unexpected error occurred."
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function postAnswer(req, res) {
  var user_id, question_id, content;
  return regeneratorRuntime.async(function postAnswer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Get user ID from JWT middleware
          user_id = req.user.user_id;
          question_id = req.params.question_id;
          content = req.body.content;

          if (content) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide answer content"
          }));

        case 5:
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(dbConnection.query("INSERT INTO answerTable (question_id, user_id, content)\n       VALUES (?, ?, ?)", [question_id, user_id, content]));

        case 8:
          return _context2.abrupt("return", res.status(201).json({
            message: "Answer posted successfully."
          }));

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](5);
          console.log(_context2.t0.message);
          return _context2.abrupt("return", res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred."
          }));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 11]]);
}

module.exports = {
  singleQuestion: singleQuestion,
  postAnswer: postAnswer
};