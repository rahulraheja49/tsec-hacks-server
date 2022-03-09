const router = require("express").Router();
const { userAuth } = require("../middleware/auth");
const {
  createInvitation,
  deleteInvitation,
  getInvitations,
  createRequest,
  getRequests,
  deleteRequest,
} = require("../controllers/invitation");

router
  .route("/")
  .post(userAuth, createInvitation)
  .get(userAuth, getInvitations)
  .delete(userAuth, deleteInvitation);

router
  .route("/request")
  .post(userAuth, createRequest)
  .get(userAuth, getRequests)
  .delete(userAuth, deleteRequest);

module.exports = router;
