const connection = require("../db/conexion.js");

async function findUserByEmail(email){
  const [rows] = await connection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  return rows[0];
};

async function findUserById(id){
  const [rows] = await connection.query(
    "SELECT * FROM usuarios WHERE id = ?",
    [id]
  );
  return rows[0];
};

async function findUserByName(user){
  const [rows] = await connection.query(
    "SELECT * FROM usuarios WHERE nombre = ?",
    [user]
  );
  return rows[0];
};

async function findUserByUsername(user){
  const [rows] = await connection.query(
    "SELECT * FROM usuarios WHERE user = ?",
    [user]
  );
  return rows[0];
};

async function createUser(user, nombre, email, password){
  const [result] = await connection.query(
    "INSERT INTO usuarios (user, nombre, email, password) VALUES (?, ?, ?, ?)",
    [user, nombre, email, password]
  );

  return result.insertId;
};

async function updateAttempts(id, intentos, bloqueo){
  const [result] = await connection.query(
    "UPDATE usuarios SET intentos_fallidos = ?, bloqueado_hasta = ? WHERE id = ?",
    [intentos, bloqueo, id]
  );
  return result;
};

async function saveResetToken(id, resetToken, expires){
  const [result] = await connection.query(
    "UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE id = ?",
    [resetToken, expires, id]
  );
  return result.affectedRows; // Retorna cuántas filas fueron modificadas
};

module.exports = {
    findUserByEmail,
    findUserById,
    findUserByName,
    findUserByUsername,
    createUser,
    updateAttempts,
    saveResetToken
}