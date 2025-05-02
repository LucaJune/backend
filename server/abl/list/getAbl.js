const Ajv = require("ajv");
const ajv = new Ajv();
const listDao = require("../../dao/list-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read list by given id
    const list = listDao.get(reqParams.id);
    if (!list) {
      res.status(404).json({
        code: "listNotFound",
        message: `list with id ${reqParams.id} not found`,
      });
      return;
    }

    // check if the user is the owner or a member of the list
    const isOwner = list.ownerID === req.user.id;
    const isMember = list.memberIdList.includes(req.user.id);

    if (!isOwner && !isMember) {
      res.status(403).json({
        code: "notAuthorized",
        message: "User is not authorized to view this list",
      });
      return;
    }

    // return properly filled dtoOut
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
