//Rutas
const ProductosModel = require("../model/ProductModel.js");

// GET
const getProductos = async (req, res) => {
    try {
        const productos = await ProductosModel.getAllProducts();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
}

const getProductoById = async (req, res) => { 
  try { 
    const { id } = req.params; 
    const producto = await ProductosModel.findProductById(id); 
 
    if (!producto) 
      return res.status(404).json({ mensaje: 'Producto no encontrado' }); 
 
    res.json(producto); 
  } catch (error) { 
    console.error('Error al obtener producto:', error); 
    res.status(500).json({ mensaje: 'Error al obtener producto' }); 
  } 
};

const getProductoByNombre = async (req, res) => { 
  try { 
    const { nombre } = req.params; 
    const producto = await ProductosModel.findProductByName(nombre); 
 
    if (!producto) 
      return res.status(404).json({ mensaje: 'Producto no encontrado' }); 
 
    res.json(producto); 
  } catch (error) { 
    console.error('Error al obtener producto:', error); 
    res.status(500).json({ mensaje: 'Error al obtener producto' }); 
  } 
};

const getProductoByType = async (req, res) => { 
  try { 
    const { tipo } = req.params; 
    const producto = await ProductosModel.findProductByType(tipo); 
 
    if (!producto) 
      return res.status(404).json({ mensaje: 'Producto no encontrado' }); 
 
    res.json(producto); 
  } catch (error) { 
    console.error('Error al obtener producto:', error); 
    res.status(500).json({ mensaje: 'Error al obtener producto' }); 
  } 
};

module.exports = {
    getProductos,
    getProductoByNombre,
    getProductoById,
    getProductoByType
}