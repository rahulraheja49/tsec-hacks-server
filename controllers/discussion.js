const Discussion = require("../models/Discussion");
const Answer = require("../models/Answer");

const createDiscussion = async (req, res) => {
  try {
    const { question, requirements, tags, techStack } = req.body;

    let tags_final = [];
    tags.forEach((tag) => {
      tags_final.push({ value: tag });
    });

    const discussion = await Discussion.create({
      userId: req.user._id,
      question,
      requirements,
      tags: tags_final,
      techStack,
    });

    res.status(200).send(discussion);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .sort({ createdAt: "desc" })
      .populate(["userId", "answers"]);
    return res.status(200).send(discussions);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const deleteDiscussion = async (req, res) => {
  const session = await Discussion.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const { id } = req.body;

    const discussion = await Discussion.findById(id);

    if (JSON.stringify(discussion.userId) !== JSON.stringify(req.user._id)) {
      return res
        .status(400)
        .send({ msg: "You cannot delete another user's discussion" });
    }

    await Discussion.findByIdAndDelete(id, opts);
    await Answer.deleteMany({ discussionId: id }, opts);

    await session.commitTransaction();
    session.endSession();
    return res.status(200).send({ msg: "Delete Successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const createAnswer = async (req, res) => {
  try {
    const { discussionId, answer } = req.body;

    const discussion_before = await Discussion.findById(discussionId);

    if (
      JSON.stringify(discussion_before.userId) === JSON.stringify(req.user._id)
    ) {
      return res.status(400).send({ msg: "Cannot make answer on own project" });
    }

    const new_ans = await Answer.create({
      userId: req.user._id,
      discussionId,
      answer,
    });

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $addToSet: {
          answers: new_ans._id,
        },
      },
      {
        new: true,
        returnDocument: "after",
      }
    );

    return res.status(200).send({ new_ans, discussion });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const deleteAnswer = async (req, res) => {
  const session = await Discussion.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const { discussionId, answerId } = req.body;

    const answer = await Answer.findById(answerId);

    if (JSON.stringify(answer.userId) !== JSON.stringify(req.user._id)) {
      return res
        .status(400)
        .send({ msg: "You cannot delete another user's answer" });
    }

    await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $pull: {
          answers: answerId,
        },
      },
      opts
    );
    await Answer.findByIdAndDelete(answerId, opts);

    await session.commitTransaction();
    session.endSession();
    return res.status(200).send({ msg: "Delete Successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

module.exports = {
  createDiscussion,
  getDiscussions,
  deleteDiscussion,
  createAnswer,
  deleteAnswer,
};
