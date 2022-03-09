const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const chalk = require("chalk");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/redirect",
    },
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({
        email: profile._json.email,
        login_method: "google",
      }).then((currentUser) => {
        if (currentUser) {
          // console.log('user is:', currentUser);
          done(null, currentUser);
        } else {
          console.log(profile);
          new User({
            email: profile._json.email,
            fullName: profile.displayName,
            login_method: "google",
          })
            .save()
            .then((newUser) => {
              console.log(`New user created: ${newUser}`);
              req.user = newUser;
              done(null, newUser);
            });
        }
      });
    }
  )
);

// passport.use(new GitHubStrategy({
//   clientID: GITHUB_CLIENT_ID,
//   clientSecret: GITHUB_CLIENT_SECRET,
//   callbackURL: "http://127.0.0.1:3000/auth/github/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ githubId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// ));
