const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const listFolderPath = path.join(
  __dirname, 
  "storage", 
  "listList"
);

// Method to read a shopping list from a file
function get(listId) {
  try {
    const filePath = path.join(listFolderPath, `${listId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadList", message: error.message };
  }
}

// Method to create an list to a file
function create(list) {
  try {
    list.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(listFolderPath, `${list.id}.json`);
    const fileData = JSON.stringify(list);
    fs.writeFileSync(filePath, fileData, "utf8");
    return list;
  } catch (error) {
    throw { code: "failedToCreateList", message: error.message };
  }
}

// Method to update a shopping list in a file
function update(list) {
  try {
    const currentList = get(list.id);
    if (!currentList) return null;

    const newList = { ...currentList, ...list };
    const filePath = path.join(listFolderPath, `${list.id}.json`);
    const fileData = JSON.stringify(newList);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newList;
  } catch (error) {
    throw { code: "failedToUpdateList", message: error.message };
  }
}

// Method to remove a shopping list from a file
function remove(listId) {
  try {
    const filePath = path.join(listFolderPath, `${listId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveList", message: error.message };
  }
}

// Method to list a shopping lists in a folder
function list() {
  try {
    const files = fs.readdirSync(listFolderPath);
    const listList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(listFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return listList;
  } catch (error) {
    throw { code: "failedToListLists", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list
};