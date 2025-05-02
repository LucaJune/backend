require('dotenv').config(); // Načte environmentální proměnné

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;
const listController = require("./controller/list");
const itemController = require("./controller/item");
const userController = require("./controller/user");
const authenticateToken = require('./middleware/authMiddleware');

// Middleware pro parsování JSON a URL encoded těla požadavků
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging výpis
console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);

// Root routa
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Veřejná routa pro uživatele
app.use("/user", userController);

// Použití middleware pro ověřování uživatelů na specifických routách
app.use("/list", authenticateToken, listController);
app.use("/item", authenticateToken, itemController);

// Spuštění serveru
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
