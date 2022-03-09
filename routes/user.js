const router = require("express").Router();
const { userAuth } = require("../middleware/auth");
const { getUser, userUpdate, getSkills } = require("../controllers/user");

router.route("/").get(userAuth, getUser).put(userAuth, userUpdate);

router.get("/skills", getSkills);

module.exports = router;
