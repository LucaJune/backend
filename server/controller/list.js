const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/list/getAbl");

const CreateAbl = require("../abl/list/createAbl");
const UpdateAbl = require("../abl/list/updateAbl");
const DeleteAbl = require("../abl/list/deleteAbl");

router.get("/get", GetAbl);

router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;