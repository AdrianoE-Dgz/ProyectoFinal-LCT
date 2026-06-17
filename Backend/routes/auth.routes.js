const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/middleware.js");
const { register, login, esAdmin, esUsuario } = require("../controllers/User.Controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/esAdmin", verifyToken, isAdmin, esAdmin);
router.get('/esUsuario',verifyToken, esUsuario);


module.exports = router;
