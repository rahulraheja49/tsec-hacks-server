const router = require("express").Router();
const { userAuth } = require("../middleware/auth");
const {
  createDiscussion,
  deleteDiscussion,
  getDiscussions,
  createAnswer,
  deleteAnswer,
  upvoteAnswer,
} = require("../controllers/discussion");

router
  .route("/")
  .post(userAuth, createDiscussion)
  .get(getDiscussions)
  .delete(userAuth, deleteDiscussion);

router
  .route("/answer")
  .post(userAuth, createAnswer)
  .delete(userAuth, deleteAnswer)
  .put(userAuth, upvoteAnswer);

module.exports = router;
