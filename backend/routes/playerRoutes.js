const express = require("express");
const {
  getPlayers,
  addPlayer,
  deletePlayer,
  updatePlayer,
} = require("../controllers/playerController");

const router = express.Router();

router.get("/", getPlayers);
router.post("/", addPlayer);
router.delete("/:id", deletePlayer);
router.put("/:id", updatePlayer);

module.exports = router;
