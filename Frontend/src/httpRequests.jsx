const API_URL = 'http://localhost:3000'
// import { iUser, iNewUser } from '/src/interfaces/userInterface.ts'

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
      
      return
    }

    // Guardar token
    if (data.token) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("usuario", JSON.stringify(data.usuario))
    }

  } catch (error) {
    console.error( error );
    return 'No se pudo conectar al servidor';
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
      
      return
    }

  } catch (error) {
    console.error( error );
    return 'No se pudo conectar al servidor';
  }
}