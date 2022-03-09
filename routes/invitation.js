const router = require("express").Router();
const { userAuth } = require("../middleware/auth");
const {
  createInvitation,
  deleteInvitation,
  getInvitations,
  createRequest,
  getRequests,
  deleteRequest,
  editInvitation,
  editRequest,
  addCollaborator,
  allInvitations,
} = require("../controllers/invitation");

router
  .route("/")
  .post(userAuth, createInvitation)
  .get(userAuth, getInvitations)
  .delete(userAuth, deleteInvitation)
  .put(userAuth, addCollaborator);

router.put("/:invitationId", userAuth, editInvitation);

router.get("/all", allInvitations);

router
  .route("/request")
  .post(userAuth, createRequest)
  .get(userAuth, getRequests)
  .delete(userAuth, deleteRequest);

router.put("/request/:requestId", userAuth, editRequest);

module.exports = router;
