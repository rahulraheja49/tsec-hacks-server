const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  photo: {
    type: String,
  },
  requirements: {
    type: String,
  },
  tags: [
    {
      skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
      },
    },
  ],
  about: {
    type: String,
    required: true,
  },
  techStack: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  upvote: {
    type: Number,
    default: 0,
  },
});

const Invitation = mongoose.model("invitation", invitationSchema);

module.exports = Invitation;
