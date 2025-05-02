const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        user: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read user by given id
    const user = userDao.get(reqParams.id);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        user: `User with id ${reqParams.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(user);
  } catch (e) {
    res.status(500).json({ user: e.user });
  }
}

module.exports = GetAbl;