const Invitation = require("../models/Invitation");
const Request = require("../models/Request");

const createInvitation = async (req, res) => {
  try {
    const { pic, requirements, tags, about, techStack, url, deadline } =
      req.body;

    if (!about || !url || !techStack) {
      return res.status(400).send({ msg: "About, URL and Techstack required" });
    }

    let tags_final = [];
    tags.forEach((tag) => {
      tags_final.push({ value: tag });
    });

    const invitation = await Invitation.create({
      userId: req.user._id,
      pic,
      requirements,
      tags: tags_final,
      about,
      techStack,
      url,
      deadline,
    });

    res.status(200).send(invitation);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const getInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({
      userId: req.user._id,
    }).populate("requests");
    return res.status(200).send(invitations);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const deleteInvitation = async (req, res) => {
  const session = await Invitation.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const { id } = req.body;

    const project = await Invitation.findById(id);

    if (JSON.stringify(project.userId) !== JSON.stringify(req.user._id)) {
      return res
        .status(400)
        .send({ msg: "You cannot delete another user's project" });
    }

    await Invitation.findByIdAndDelete(id, opts);
    await Request.deleteMany({ invitationId: id }, opts);

    await session.commitTransaction();
    session.endSession();
    return res.status(200).send({ msg: "Delete Successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const createRequest = async (req, res) => {
  try {
    const { invitationId, why } = req.body;

    const invitation_before = await Invitation.findById(invitationId);

    if (
      JSON.stringify(invitation_before.userId) === JSON.stringify(req.user._id)
    ) {
      return res
        .status(400)
        .send({ msg: "Cannot make request on own project" });
    }

    const request = await Request.create({
      userId: req.user._id,
      invitationId,
      why,
    });

    const invitation = await Invitation.findByIdAndUpdate(
      invitationId,
      {
        $addToSet: {
          requests: request._id,
        },
      },
      {
        new: true,
        returnDocument: "after",
      }
    );

    return res.status(200).send({ request, invitation });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user._id });
    return res.status(200).send(requests);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const deleteRequest = async (req, res) => {
  const session = await Invitation.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const { invitationId, requestId } = req.body;

    const request = await Request.findById(requestId);

    if (JSON.stringify(request.userId) !== JSON.stringify(req.user._id)) {
      return res
        .status(400)
        .send({ msg: "You cannot delete another user's request" });
    }

    await Invitation.findByIdAndUpdate(
      invitationId,
      {
        $pull: {
          requests: requestId,
        },
      },
      opts
    );
    await Request.findByIdAndDelete(requestId, opts);

    await session.commitTransaction();
    session.endSession();
    return res.status(200).send({ msg: "Delete Successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

module.exports = {
  createInvitation,
  getInvitations,
  deleteInvitation,
  createRequest,
  getRequests,
  deleteRequest,
};