const fs = require('fs');

const profiles = {
  Administrator: {
    permissions: {
      item: ["createAbl", "deleteAbl", "getAbl", "listAbl", "updateAbl"],
      list: ["createAbl", "deleteAbl", "getAbl", "listAbl", "updateAbl"]
    }
  },
  Executives: {
    permissions: {
      item: ["createAbl", "deleteAbl", "getAbl", "listAbl", "updateAbl"],
      list: ["createAbl", "deleteAbl", "getAbl", "listAbl", "updateAbl"]
    }
  },
  Readers: {
    permissions: {
      item: ["createAbl", "deleteAbl"],
      list: []
    }
  },
  Public: {
    permissions: {
      item: ["createAbl"],
      list: []
    }
  }
};

fs.writeFile('profiles.json', JSON.stringify(profiles, null, 4), (err) => {
  if (err) throw err;
  console.log('The profiles.json file has been created successfully.');
});
