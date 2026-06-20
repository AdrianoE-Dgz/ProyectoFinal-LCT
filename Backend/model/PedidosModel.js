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

async function insertPedido(usuarios_id, contenido, fechaPedido, fechaEntrega, direccion, precio) {
    const [result] = await connection.query(
        'INSERT INTO pedido (usuarios_id, contenido, fechaPedido, fechaEntrega, direccion, precio) VALUES (?, ?, ?, ?, ?, ?)',
        [usuarios_id, contenido, fechaPedido, fechaEntrega, direccion, precio]
    );
    return result.insertId;
}

async function updatePedido(fechaEntrega, direccion, id) {
    const [result] = await connection.query(
        'UPDATE pedido SET fechaEntrega = ?, direccion = ? WHERE id = ?',
        [fechaEntrega, direccion, id]
    );
    return result.affectedRows;
}

async function deletePedido(id) {
    const [result] = await connection.query('DELETE FROM pedido WHERE id = ?', [id]);
    return result.affectedRows;
}

module.exports = {
    findPedidoById,
    findPedidoByIdUser,
    getAllPedidos,
    insertPedido,
    updatePedido,
    deletePedido
}