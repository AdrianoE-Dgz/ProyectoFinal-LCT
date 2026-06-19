const express = require('express');
const router = express.Router();
const { getPedidoById, getPedidoByUser, getPedidos, postPedido, updatePedido, deletePedido } = require("../controllers/Pedidos.Controller.js");
const { verifyToken, isAdmin } = require("../middleware/middleware.js");

router.get('/obtenerPedidos', verifyToken, isAdmin, getPedidos);
router.get("/obtenerPedidoId/:id", verifyToken, getPedidoById);
router.get('/obtenerPedidoUsuario',verifyToken, getPedidoByUser);
router.post('/guardarPedido', verifyToken, postPedido);
router.put('/actualizarPedido/:id', verifyToken, updatePedido);
router.delete('/borrarPedido/:id', verifyToken, deletePedido);

module.exports = router;