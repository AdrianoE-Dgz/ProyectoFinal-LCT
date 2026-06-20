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
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ msg: "Usuario no encontrado" })
    }

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
    const usuarios_id = req.user.id;
    const { contenido, fechaPedido, fechaEntrega, direccion, precio } = req.body; 

    if (!usuarios_id || !contenido || !fechaPedido || !fechaEntrega || !precio || !direccion ){
      console.log(usuarios_id, contenido, fechaPedido, fechaEntrega, direccion, precio);
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }
 
    console.log("1"); 
    const id_insertado = await PedidosModel.insertPedido(usuarios_id, contenido, fechaPedido, fechaEntrega, direccion, precio); 
    res.status(201).json({ mensaje: 'Pedido agregado', id_insertado }); 
    
    console.log("2");
  } catch (error) { 
    console.error('Error al agregar pedido:', error); 
    res.status(500).json({ mensaje: 'Error al agregar pedido' }); 
  } 
}; 

const updatePedido = async (req, res) => {
  console.log("** ENTRAR UPDATE **");
  try { 
    const { id } = req.params; 
    const { fechaEntrega, direccion } = req.body; 
 
    const filas = await PedidosModel.updatePedido(fechaEntrega, direccion, id); 
    if (filas === 0) {
      console.log('Pedido no encontrado');
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
 
    res.json({ mensaje: 'Pedido actualizado correctamente' }); 
    console.log('Pedido actualizado correctamente');
  } catch (error) { 
    console.error('Error al actualizar pedido:', error); 
    res.status(500).json({ mensaje: 'Error al actualizar pedido' }); 
  } 
}; 

const deletePedido = async (req, res) => { 
  try { 
    const { id } = req.params; 
    const filas = await PedidosModel.deletePedido(id); 
 
    if (filas === 0) 
      return res.status(404).json({ mensaje: 'Pedido no encontrado' }); 
 
    res.json({ mensaje: 'Pedido eliminado correctamente' }); 
  } catch (error) { 
    console.error('Error al eliminar pedido:', error); 
    res.status(500).json({ mensaje: 'Error al eliminar pedido' }); 
  } 
}; 

module.exports = {
    getPedidoById,
    getPedidoByUser,
    getPedidos,
    postPedido,
    updatePedido,
    deletePedido
}