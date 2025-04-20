const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let item = req.body;

    // validate input
    const valid = ajv.validate(schema, item);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        item: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // store item to a persistant storage
    try {
      item = itemDao.create(item);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(item);
  } catch (e) {
    res.status(500).json({ item: e.item });
  }
}

module.exports = CreateAbl;