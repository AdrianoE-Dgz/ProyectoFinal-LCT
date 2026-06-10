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
  try {
    console.log(req.body); 
    const {nombre,email,password} = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ msg: "Solo se permiten correos Gmail" })
    }
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ msg: "Este correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(nombre, email, hashedPassword);

    res.status(201).json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar usuario" });
  }

};

// LOGIN
async function login(req, res){
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ msg: "Credenciales incorrectas" })
    }

    const validPassword = await bcrypt.compare(password, user.password);

    /*
    if (!validPassword) {
      const newAttempts = user.intentos_fallidos + 1;

      let bloqueo = null;

      if (newAttempts >= 3) {
        bloqueo = new Date(Date.now() + 5 * 60 * 1000); // 5 min
      }

      await updateAttempts(user.id, newAttempts, bloqueo);

      return res.status(401).json({
        msg: "Contraseña incorrecta",
        intentos: newAttempts
      });
    }

    // Reset intentos
    await updateAttempts(user.id, 0, null);
    */

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      usuario: {
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en login" });
  }
};

async function esUsuario(req, res){ 
  try { 
    const user = await UserModel.findUserById(1);
    console.log(user)
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

module.exports = {
    //validarCaptcha,
    register,
    login,
    esUsuario,
    esAdmin
}