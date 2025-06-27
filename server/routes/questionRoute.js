const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware/authMiddleware");

// question controller
const {
  postQuestion,
  singleQuestion,
  allQuestion,
} = require("../controller/questionController");

router.post("", authMiddleware, postQuestion);

router.get("", authMiddleware, allQuestion);

router.get("/:question_id", authMiddleware, singleQuestion);

module.exports = router;
