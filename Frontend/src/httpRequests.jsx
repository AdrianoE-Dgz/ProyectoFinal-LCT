const API_URL = 'http://localhost:3000'

export async function logUser(user, password) {
  const body = {user, password};

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
      return {exito: false, mensaje: 'No se pudo conectar al servidor'}
    }

    console.log(data);

    // Guardar token
    if (data.token) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("usuario", JSON.stringify(data.usuario))
    }

  } catch (error) {
    console.error( error );
    return {exito: false, mensaje: 'No se pudo conectar al servidor'};
  }
}

export async function registUser(user) {
  const body = {...user};

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
      return  {exito: false, mensaje: res.mensaje};
    }

    console.log(data);

  } catch (error) {
    console.error( error );
    return {exito: false, mensaje: 'No se pudo conectar al servidor'};
  }
}