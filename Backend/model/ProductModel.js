const connection = require("../db/conexion.js");

async function findProductById(id){
  const [rows] = await connection.query(
    "SELECT * FROM productos WHERE id = ?",
    [id]
  );
  return rows[0];
};

async function findProductByName(nombre){
  const [rows] = await connection.query(
    "SELECT * FROM productos WHERE nombre = ?",
    [nombre]
  );
  return rows[0];
};

async function findProductByType(tipo){
  const [rows] = await connection.query(
    "SELECT * FROM productos WHERE tipo = ?",
    [tipo]
  );
  return rows;
};

async function getAllProducts() {
    try {
        const [rows] = await pool.query("SELECT * FROM productos")
        return rows;
    } catch (error) {
        console.error("Error al conectarse con al base de datos", error);
        return null;
    }
}

module.exports = {
    getAllProducts,
    findProductById,
    findProductByName,
    findProductByType
}