const express = require('express');
const app = express();
const port = 10070;

const listController = require("./controller/list");
const itemController = require("./controller/item");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/list", listController);
app.use("/item", itemController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});