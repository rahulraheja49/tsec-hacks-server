require("dotenv").config();

const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();
const db = require("./config/db");
const AuthRoutes = require("./routes/auth");
const InvitationRoutes = require("./routes/invitation");
const UserRoutes = require("./routes/user");
const DiscussionRoutes = require("./routes/discussion");

db();
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", AuthRoutes);
app.use("/api/invitation", InvitationRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/discussion", DiscussionRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ Msg: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(chalk.cyanBright(`Listening on port ${PORT}`));
});

// put: userUpdate, upvoteAnswer
// get: getUser, getDiscussion, getInvitations, getRequests, getSkills
// delete: deleteInvitation, deleteDiscussion, deleteAnswer, deleteRequest
// post: createDiscussion, createInvitation, createAnswer, createRequest
