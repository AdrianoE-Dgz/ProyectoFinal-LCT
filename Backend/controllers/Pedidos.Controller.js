//Rutas
const PedidosModel = require("../model/PedidosModel.js");

// GET
const getPedidos = async (req, res) => {
    try {
        const pedido = await PedidosModel.getAllPedidos();
        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({ mensaje: 'Error al obtener pedidos' });
    }
}

const getPedidoById = async (req, res) => { 
  try { 
    const { id } = req.params; 
    const pedido = await PedidosModel.findPedidoById(id); 
 
    if (!pedido) 
      return res.status(404).json({ mensaje: 'Pedido no encontrado' }); 
 
    res.json(pedido); 
  } catch (error) { 
    console.error('Error al obtener pedido:', error); 
    res.status(500).json({ mensaje: 'Error al obtener pedido' }); 
  } 
};

const getPedidoByUser = async (req, res) => { 
  try { 
    const { id } = req.params; 
    const pedidos = await PedidosModel.findPedidoByIdUser(id); 
 
    if (!pedidos) 
      return res.status(404).json({ mensaje: 'Pedidos no encontrados' }); 
 
    res.json(pedidos); 
  } catch (error) { 
    console.error('Error al obtener pedidos:', error); 
    res.status(500).json({ mensaje: 'Error al obtener pedidos' }); 
  } 
};

const postPedido = async (req, res) => { 
  try { 
    console.log(req.body); 
    const { usuarios_id, contenido, fechaPedido, fechaEntrega, precio } = req.body; 
    if (!usuarios_id || !contenido || !fechaPedido || !fechaEntrega || !precio ){
      console.log(usuarios_id, contenido, fechaPedido, fechaEntrega, precio);
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }
 
    console.log("1"); 
    const id_insertado = await PedidosModel.insertPedido(usuarios_id, contenido, fechaPedido, fechaEntrega, precio); 
    res.status(201).json({ mensaje: 'Pedido agregado', id_insertado }); 
    console.log("2"); 
  } catch (error) { 
    console.error('Error al agregar pedido:', error); 
    res.status(500).json({ mensaje: 'Error al agregar pedido' }); 
  } 
}; 

module.exports = {
    getPedidoById,
    getPedidoByUser,
    getPedidos,
    postPedido
}