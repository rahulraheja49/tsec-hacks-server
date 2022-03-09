const router = require("express").Router();
const { userAuth } = require("../middleware/auth");
const {
  createDiscussion,
  deleteDiscussion,
  getDiscussions,
  createAnswer,
  deleteAnswer,
} = require("../controllers/discussion");

router
  .route("/")
  .post(userAuth, createDiscussion)
  .get(getDiscussions)
  .delete(userAuth, deleteDiscussion);

router
  .route("/answer")
  .post(userAuth, createAnswer)
  .delete(userAuth, deleteAnswer);

module.exports = router;
