const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware/authMiddleware");

const {
  singleQuestion,
  postAnswer,
} = require("../controller/answerController");
// user controller

router.get("/:question_id", singleQuestion);

router.post("/:question_id", authMiddleware, postAnswer);

module.exports = router;
