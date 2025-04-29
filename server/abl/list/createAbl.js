const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/list-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 50 },
    itemIdList: { type: "array"}
  },
  required: ["name"],
  additionalProperties: false,
};


async function CreateAbl(req, res) {
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

    // store list to a persistant storage
    try {
      list = listDao.create(list);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(list);
  } catch (e) {
    res.status(500).json({ list: e.list });
  }
}

module.exports = CreateAbl;