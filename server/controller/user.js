const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

const GetAbl = require("../abl/user/getAbl");
const CreateAbl = require("../abl/user/createAbl");

router.get("/get", authenticateToken, GetAbl);
router.post("/create", CreateAbl);

module.exports = router;
