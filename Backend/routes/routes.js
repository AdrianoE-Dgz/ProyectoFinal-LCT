const express = require('express');
const router = express.Router();
const {  } = require("../controllers/User.Controller.js");

router.get("/getUsers", getPerfumes);

module.exports = router;