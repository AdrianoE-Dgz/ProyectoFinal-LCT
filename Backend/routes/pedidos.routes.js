const express = require('express');
const router = express.Router();
const { getPedidoById, getPedidoByUser, getPedidos, postPedido } = require("../controllers/Pedidos.Controller.js");
const { verifyToken, isAdmin } = require("../middleware/middleware.js");

router.get('/obtenerPedidos', verifyToken, isAdmin, getPedidos);
router.get("/obtenerPedidoId/:id", verifyToken, getPedidoById);
router.get('/obtenerPedidoUsuario/:id',verifyToken, getPedidoByUser);
router.post('/guardarPedido', verifyToken, postPedido)

module.exports = router;