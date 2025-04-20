const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const itemDao = require("../../dao/item-dao.js");

async function ListAbl(req, res) {
  try {
    const itemList = itemDao.list(filter);

    // return properly filled dtoOut
    res.json({itemList});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;