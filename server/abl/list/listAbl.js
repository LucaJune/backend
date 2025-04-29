const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const listDao = require("../../dao/list-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    const filter = req.query?.date ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const listList = listDao.list(filter);

    // return properly filled dtoOut
    res.json({listList});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;