const connection = require("../db/conexion.js");

async function findPedidoById(id){
    try{
        const [rows] = await connection.query(
        "SELECT * FROM pedido WHERE id = ?",
        [id]
        );
        return rows[0];
    }catch (error) {
        console.error("Error al conectarse con al base de datos", error);
        return null;
    }
};

async function findPedidoByIdUser(id){
    try{
        const [rows] = await connection.query(
            "SELECT * FROM pedido WHERE usuarios_id = ?",
            [id]
        );
        return rows;
    }catch (error) {
        console.error("Error al conectarse con al base de datos", error);
        return null;
    }
};

async function getAllPedidos() {
    try {
        const [rows] = await connection.query("SELECT * FROM pedido")
        return rows;
    } catch (error) {
        console.error("Error al conectarse con al base de datos", error);
        return null;
    }
}

async function insertPedido(usuarios_id, contenido, fechaPedido, fechaEntrega, precio) {
    const [result] = await connection.query(
        'INSERT INTO pedido (usuarios_id, contenido, fechaPedido, fechaEntrega, precio) VALUES (?, ?, ?, ?, ?)',
        [usuarios_id, contenido, fechaPedido, fechaEntrega, precio]
    );
    return result.insertId;
}

module.exports = {
    findPedidoById,
    findPedidoByIdUser,
    getAllPedidos,
    insertPedido
}