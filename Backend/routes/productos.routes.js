const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/middleware.js");
const { getProductoById, getProductoByNombre, getProductoByType, getProductos, getPrecioTotal } = require("../controllers/Productos.Controller");

router.get("/getProductos", getProductos);
router.get("/getProductoById/:id", getProductoById);
router.get("/getProductoByName/:nombre", getProductoByNombre);
router.get("/getProductosByTipo/:tipo", getProductoByType);
router.post('/obtenerPrecioPedido', verifyToken, getPrecioTotal);

module.exports = router;