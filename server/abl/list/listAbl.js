const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const listDao = require("../../dao/list-dao.js");

async function ListAbl(req, res) {
  try {
    const listList = listDao.list(filter);

    // return properly filled dtoOut
    res.json({listList});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;