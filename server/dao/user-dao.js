const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(
  __dirname, 
  "storage", 
  "userList"
);

// Method to get an user from a file
function get(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadUser", message: error.user };
  }
}

// Method to create an user to a file
function create(user) {
  try {
    user.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}

module.exports = {
  get,
  create
};