const express = require('express');
const router = express.Router();
const {  } = require("../controllers/controller.js");

router.get("/getPerfumes", getPerfumes);

module.exports = router;