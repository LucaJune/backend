const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/list-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", maxLength: 50 },
    itemIdList: { type: "string" },
  },
  required: ["name", "itemIdList", "id"],
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
        list: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // update list in persistent storage
    let updatedList;
    try {
      updatedLIst = listDao.update(list);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedList) {
      res.status(404).json({
        code: "listNotFound",
        list: `List with id ${list.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updatedList);
  } catch (e) {
    res.status(500).json({ list: e.list });
  }
}

module.exports = UpdateAbl;