//Rutas
const UserModel = require("../model/UserModel.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const crypto = require("crypto");
const { 
    findUserByEmail,
    findUserById,
    findUserByName,
    findUserByUsername,
    createUser,
    updateAttempts,
    saveResetToken
} = require("../model/UserModel.js");

/*
async function validarCaptcha(token){
    const secret = process.env.RECAPTCHA_SECRET;
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`
    });

    const data = await response.json();
    return data.success;
};
*/
// REGISTRO
const register = async (req, res) => {
  console.log("---------------- Registro ----------------")
  try {
    const {usuario,nombre,correo,password} = req.body;

    console.log(req.body);

    if ( !usuario || !nombre || !correo || !password ) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!correo.endsWith("@gmail.com")) {
      return res.status(400).json({ msg: "Solo se permiten correos Gmail" })
    }
    
    const existingEmail = await findUserByEmail(correo);
    if (existingEmail) {
      return res.status(409).json({ msg: "Este correo ya está registrado" });
    }

    const existingUser = await findUserByUsername(usuario);
    if (existingUser) {
      return res.status(409).json({ msg: "Este usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(usuario, nombre, correo, hashedPassword);

    res.status(201).json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar usuario" });
  }

};

// LOGIN
async function login(req, res){
  const { user, password } = req.body;

  try {
    const userCorreo = await findUserByEmail(user);
    const userName = await findUserByUsername(user);

    if (!userCorreo && !userName) {
      return res.status(400).json({ msg: "Credenciales incorrectas" })
    }

    const usuario = userCorreo || userName;

    const validPassword = await bcrypt.compare(password, usuario.password);
    
    if (!validPassword) {
      return res.status(401).json({
        msg: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      usuario: {
        // user: usuario.user,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en login" });
  }
};

async function esUsuario(req, res){ 
  try { 
    res.status(200).json({
        message: "El usuario tiene una sesion iniciada"
    });
  } catch (error) { 
    console.error('Error: error al comprobar usuario', error); 
    res.status(500).json({ mensaje: 'Error al comprobar usuario' }); 
  } 
}; 

async function esAdmin(req, res){ 
  try { 
    res.status(200).json({
        message: "El usuario es un Administrador"
    });
  } catch (error) { 
    console.error('Error: error al comprobar administrador', error); 
    res.status(500).json({ mensaje: 'Error al comprobar administrador' }); 
  } 
};

async function datosUsuario(req, res) {
  const { user, password } = req.body;

  try {
    const usuario = await findUserByUsername(user);

    if (!usuario) {
      return res.status(400).json({ msg: "Usuario no encontrado" })
    }

    res.json({
      msg: "Información encontrada",
      usuario: {
        user: usuario.user,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en buscar información" });
  }
}

module.exports = {
    //validarCaptcha,
    register,
    login,
    esUsuario,
    esAdmin,
    datosUsuario
}