const express = require('express');
const router = express.Router();
const {  } = require("../controllers/controller.js");

router.get("/getProductos", get);

module.exports = router;