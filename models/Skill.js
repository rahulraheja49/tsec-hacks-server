const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const skills = require("../utils/skills");

const skillSchema = new Schema({
  name: {
    type: String,
    enum: skills,
  },
});

const Skill = mongoose.model("skill", skillSchema);

module.exports = Skill;
