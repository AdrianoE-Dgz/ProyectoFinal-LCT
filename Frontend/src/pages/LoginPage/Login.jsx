import { useState } from 'react';
import './Login.css'

import iUser from '/src/interface/userInterface.ts'

function Login() {
  const [user, setUser] = useState(new iUser);
  const [login, setLogin] = useState(true);

  const loginUser = (e) => {
    e.preventDefault();

    setUser();
  };

  const switchLogin = () => {
    if(login){
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  return (
    <section id="generalContainer" className='d-flex align-items-center'>
      <section id='loginFormCont' className='card p-4 m-auto'>
        {(login) ?
          <>
            <form id="loginForm">
              <div className="mb-3">
                <label for="loginUsername" className="form-label">Usuario</label>
                <input type="text" className="form-control" id="loginUsername" />
              </div>
              <div className="mb-3">
                <label for="loginPassword" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="loginPassword" />
              </div>
              <div className='text-center mb-3'>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
              </div>
            </form>
            <p className='text-center'>¿No tienes una cuenta? <a href='#' className='text-primary' onClick={switchLogin}>Registrate</a></p>
          </>
          :
          <>
            <form id="registerForm">
              <div className="mb-3">
                <label for="registerName" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="registerName" />
              </div>
              <div className="mb-3">
                <label for="registerUsername" className="form-label">Usuario</label>
                <input type="text" className="form-control" id="registerUsername" />
              </div>
              <div className="mb-3">
                <label for="registerPassword1" className="form-label">Contraseña: </label>
                <input type="password" className="form-control" id="registerPassword1" />
              </div>
              <div className="mb-3">
                <label for="registerPassword2" className="form-label">Confirmar Contraseña: </label>
                <input type="password" className="form-control" id="registerPassword2" />
              </div>
              <div className='text-center mb-3'>
                <button type="submit" className="btn btn-primary">Registrarse</button>
              </div>
            </form>
            <p className='text-center'>¿Ya tienes una cuenta? <a href='#' className='text-primary' onClick={switchLogin}>Inicia Seción</a></p>
          </>
        }
      </section>
    </section>
  )
}

export default Login