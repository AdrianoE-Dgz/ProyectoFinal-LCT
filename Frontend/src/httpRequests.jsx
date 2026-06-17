const API_URL = 'http://localhost:3000'

export async function logUser(username, password) {
  const body = {user: username, password: password};

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
    localStorage.setItem("nombre", usuario.nombre);
    localStorage.setItem("rol", usuario.rol);

    return {exito: true, mensaje: 'Login Correcto'};
  } catch (error) {
    return {exito: false, mensaje: 'Error al conectar con el servidor'};
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
    return {exito: false, mensaje: 'Error al conectar con el servidor'};
  }
}

export async function isUser() {
  try {
    const res = await fetch(`${API_URL}/api/usuarios/esUsuario`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return  false;
    }

    return true;
  } catch (error) {
    console.error( error );
    return false;
  }
}

export async function isAdmin() {
  try {
    const res = await fetch(`${API_URL}/api/usuarios/esAdmin`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return  false;
    }

    return true;
  } catch (error) {
    console.error( error );
    return false;
  }
}

export async function datosUser() {
  try {
    const res = await fetch(`${API_URL}/api/usuarios/datosUsuario`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return  {exito: false, mensaje: data.msg};
    }

    const usuario = data.usuario;
    console.log(usuario);

    return {exito: true, usuario: usuario};
  } catch (error) {
    console.error( error );
    return {exito: false, mensaje: 'Error al conectar con el servidor'};
  }
}