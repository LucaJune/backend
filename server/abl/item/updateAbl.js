const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    // update item in persistent storage
    let updatedItem;
    try {
      updatedItem = itemDao.update(item);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedItem) {
      res.status(404).json({
        code: "itemNotFound",
        item: `Item with id ${item.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updatedItem);
  } catch (e) {
    res.status(500).json({ item: e.item });
  }
}

module.exports = UpdateAbl;