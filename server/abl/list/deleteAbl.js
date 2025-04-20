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
        list: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // remove list from persistant storage
    listDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    res.status(500).json({ list: e.list });
  }
}

module.exports = DeleteAbl;