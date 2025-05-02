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

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

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

    // get the list to check ownership
    const list = listDao.get(reqParams.id);
    if (!list) {
      res.status(404).json({
        code: "listNotFound",
        message: "List not found",
      });
      return;
    }

    // check if the user is the owner of the list
    if (list.ownerID !== req.user.id) {
      res.status(403).json({
        code: "notAuthorized",
        message: "User is not authorized to delete this list",
      });
      return;
    }

    // remove list from persistent storage
    listDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
