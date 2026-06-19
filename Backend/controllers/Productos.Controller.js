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

const getPrecioTotal = async (req, res) => { 
  try {
    const { contenido } = req.body; 
    const productos = await ProductosModel.getAllProducts();
    if (!productos) 
        return res.status(404).json({ mensaje: 'Error al obtener productos' }); 

    let producto;
    let precioTotal = 0;
    for(const elementoId of contenido){
      producto = productos.find(p => p.id === Number(elementoId));
      if (!producto) 
        return res.status(404).json({ mensaje: 'Producto no encontrado' }); 
      precioTotal += producto.precio;
    }
    precioTotal += productos.find(p => p.id === 1).precio;
    precioTotal += productos.find(p => p.id === 2).precio;
    
    res.json({ precioTotal }); 
  } catch (error) { 
    console.error('Error al obtener producto:', error); 
    res.status(500).json({ mensaje: 'Error al obtener producto' }); 
  } 
};

module.exports = {
    getProductos,
    getProductoByNombre,
    getProductoById,
    getProductoByType,
    getPrecioTotal
}