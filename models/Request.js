const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  invitationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "invitation",
  },
  why: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
