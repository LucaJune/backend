const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/list-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", maxLength: 50 },
    itemIdList: { type: "array" },
    memberIdList: { type: "array" },
  },
  required: ["name", "id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let list = req.body;

    // validate input
    const valid = ajv.validate(schema, list);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // get the current list to check ownership
    const currentList = listDao.get(list.id);
    if (!currentList) {
      res.status(404).json({
        code: "listNotFound",
        message: `List with id ${list.id} not found`,
      });
      return;
    }

    // check if the user is the owner or a member of the list
    const isOwner = currentList.ownerID === req.user.id;
    const isMember = currentList.memberIdList.includes(req.user.id);

    if (!isOwner && !isMember) {
      res.status(403).json({
        code: "notAuthorized",
        message: "User is not authorized to update this list",
      });
      return;
    }

    // If the user is a member, they can only update itemIdList
    if (isMember && !isOwner) {
      list = {
        ...currentList,
        itemIdList: list.itemIdList
      };
    }

    // update list in persistent storage
    let updatedList;
    try {
      updatedList = listDao.update(list);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updatedList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
