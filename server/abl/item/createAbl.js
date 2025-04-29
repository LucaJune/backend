const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const itemDao = require("../../dao/item-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string"}
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
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }


    // store item to persistent storage
    item = itemDao.create(item);

    // return properly filled dtoOut
    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;