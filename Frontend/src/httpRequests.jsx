const API_URL = 'http://localhost:3000'

export async function logUser(user, password) {
  const body = {user: user, password: password};

  try {
    const res = await fetch(`${API_URL}/api/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
      return {exito: false, mensaje: data.msg}
    }

    // Guardar token
    if (data.token) {
      localStorage.setItem("token", data.token)
    } else {
      return {exito: false, mensaje: 'Error al ingresar usuario'};
    }

    // Guardar usuario
    const usuario = data.usuario;
    localStorage.setItem("nombre", usuario.nombre)
    localStorage.setItem("rol", usuario.rol)

    return {exito: true, mensaje: 'Login Correcto'};
  } catch (error) {
    return {exito: false, mensaje: error.msg};
  }
}

export async function registUser(user) {
  const body = {...user};

  try {
    const res = await fetch(`${API_URL}/api/usuarios/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    const data = await res.json();

    if (!res.ok) {
      return  {exito: false, mensaje: data.msg};
    }

    return {exito: true, mensaje: 'Registro Correcto'};

  } catch (error) {
    console.error( error );
    return {exito: false, mensaje: 'No se pudo conectar al servidor'};
  }
}

export async function isUser() {
  
}

export async function isAdmin() {
  
}