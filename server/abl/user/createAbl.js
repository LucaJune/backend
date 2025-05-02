const jwt = require('jsonwebtoken');
const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" }
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let user = req.body;

    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // store user to persistent storage
    user = userDao.create(user);

    // generate JWT token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    // return properly filled dtoOut with token
    res.json({ user, accessToken });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
