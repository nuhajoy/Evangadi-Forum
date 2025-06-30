"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dbConnection = require("../db/dbconfig");

var _require = require("http-status-codes"),
    StatusCodes = _require.StatusCodes;

function handleReaction(req, res) {
  var _req$body, user_id, reaction_type, answerId, _ref, _ref2, existing;

  return regeneratorRuntime.async(function handleReaction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user_id = _req$body.user_id, reaction_type = _req$body.reaction_type;
          answerId = req.params.answerId;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(dbConnection.query("SELECT * FROM answerReactionTable WHERE user_id = ? AND answer_id = ?", [user_id, answerId]));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          existing = _ref2[0];

          if (!(existing.length > 0)) {
            _context.next = 20;
            break;
          }

          if (!(existing[0].reaction_type === reaction_type)) {
            _context.next = 15;
            break;
          }

          _context.next = 12;
          return regeneratorRuntime.awrap(dbConnection.query("DELETE FROM answerReactionTable WHERE user_id = ? AND answer_id = ?", [user_id, answerId]));

        case 12:
          return _context.abrupt("return", res.status(200).json({
            message: "Reaction removed"
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(dbConnection.query("UPDATE answerReactionTable SET reaction_type = ? WHERE user_id = ? AND answer_id = ?", [reaction_type, user_id, answerId]));

        case 17:
          return _context.abrupt("return", res.status(200).json({
            message: "Reaction updated"
          }));

        case 18:
          _context.next = 23;
          break;

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(dbConnection.query("INSERT INTO answerReactionTable (user_id, answer_id, reaction_type) VALUES (?, ?, ?)", [user_id, answerId, reaction_type]));

        case 22:
          return _context.abrupt("return", res.status(200).json({
            message: "Reaction added"
          }));

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](2);
          console.error("❌ Server error in reaction controller:", _context.t0);
          res.status(500).json({
            error: "Server error",
            detail: _context.t0.message
          });

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 25]]);
}

function getReaction(req, res) {
  var answerId, user_id, _ref3, _ref4, likes, _ref5, _ref6, dislikes, userReaction, _ref7, _ref8, userReactRes;

  return regeneratorRuntime.async(function getReaction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          answerId = req.params.answerId;
          user_id = req.query.user_id;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(dbConnection.query("SELECT COUNT(*) AS likeCount FROM answerReactionTable WHERE answer_id = ? AND reaction_type = 'like'", [answerId]));

        case 5:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          likes = _ref4[0];
          _context2.next = 10;
          return regeneratorRuntime.awrap(dbConnection.query("SELECT COUNT(*) AS dislikeCount FROM answerReactionTable WHERE answer_id = ? AND reaction_type = 'dislike'", [answerId]));

        case 10:
          _ref5 = _context2.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          dislikes = _ref6[0];
          // User's reaction (if user_id is provided)
          userReaction = "none";

          if (!user_id) {
            _context2.next = 21;
            break;
          }

          _context2.next = 17;
          return regeneratorRuntime.awrap(dbConnection.query("SELECT reaction_type FROM answerReactionTable WHERE user_id = ? AND answer_id = ?", [user_id, answerId]));

        case 17:
          _ref7 = _context2.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          userReactRes = _ref8[0];

          if (userReactRes.length > 0) {
            userReaction = userReactRes[0].reaction_type;
          }

        case 21:
          res.status(200).json({
            likeCount: likes[0].likeCount,
            dislikeCount: dislikes[0].dislikeCount,
            userReaction: userReaction
          });
          _context2.next = 28;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](2);
          console.error("❌ Error fetching reactions:", _context2.t0);
          res.status(500).json({
            error: "Failed to fetch reactions",
            detail: _context2.t0.message
          });

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 24]]);
}

module.exports = {
  handleReaction: handleReaction,
  getReaction: getReaction
};