const Ajv = require("ajv");
const ajv = new Ajv();
const itemDao = require("../../dao/item-dao.js");

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
        item: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // remove item from persistant storage
    itemDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    res.status(500).json({ item: e.item });
  }
}

module.exports = DeleteAbl;