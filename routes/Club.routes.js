const express = require("express");
const router = express.Router();

const {
  getClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub,
} = require("../controllers/ClubController");

router.get("/", getClubs);

router.get("/:clubID", getClub);

router.post("/", createClub);

router.put("/:clubID", updateClub);

router.delete("/:clubID", deleteClub);

module.exports = router;
