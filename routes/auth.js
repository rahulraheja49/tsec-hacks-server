const router = require("express").Router();
const passport = require("passport");

const { signup, login, googleredirect } = require("../controllers/auth");
require("../config/passport-setup");

router.post("/signup", signup);
router.post("/login", login);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/google/redirect", passport.authenticate("google"), googleredirect);
// router.get("/github", passport.authenticate(""))

module.exports = router;
