const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/item/getAbl");

const CreateAbl = require("../abl/item/createAbl");
const UpdateAbl = require("../abl/item/updateAbl");
const DeleteAbl = require("../abl/item/deleteAbl");

router.get("/get", GetAbl);

router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;