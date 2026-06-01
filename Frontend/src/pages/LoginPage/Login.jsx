import { useState, lazy, Suspense } from 'react';
import './Login.css'

import { logUser, registUser } from '/src/httpRequests';

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'))

function Login() {
  // const [user, setUser] = useState(new iUser);
  const [login, setLogin] = useState(true);
  const [notice, setNotice] = useState({mensaje: '', color: ''})

  const loginUser = async (e) => {
    e.preventDefault();

    const username = e.target.loginUsername.value;
    const password= e.target.loginPassword.value;

    const data = await logUser(username, password);

    console.log(data);

    if(!data.exito){
      setNotice({mensaje: data.mensaje, color: 'danger'});
    }
  };

  const registerUser = (e) => {
    e.preventDefault();

    const newUser = {
      nombre: e.target.registerName.value,
      usuario: e.target.registerUsername.value,
      correo: e.target.registerEmail.value,
      passwd: e.target.registerPassword1.value
    };

    const data = registUser(newUser);

    console.log(data);

    if(!data.exito){
      setNotice({mensaje: data.mensaje, color: 'danger'});
    }
  };

  const switchLogin = () => {
    if(login){
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  return (
    <section id="generalContainer" className='d-flex flex-column align-items-center'>
        <section id='loginFormCont' className='card p-4 m-auto'>
          {(login) ?
            <>
              <form id="loginForm" onSubmit={loginUser}>
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
              <form id="registerForm" onSubmit={registerUser}>
                <div className="mb-3">
                  <label for="registerName" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="registerName" />
                </div>
                <div className="mb-3">
                  <label for="registerUsername" className="form-label">Usuario</label>
                  <input type="text" className="form-control" id="registerUsername" />
                </div>
                <div className="mb-3">
                  <label for="registerEmail" className="form-label">Correo</label>
                  <input type="email" className="form-control" id="registerEmail" />
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
          {(notice.mensaje != '') ? 
          <>
            <Suspense fallback={<p>Cargando Aviso...</p>}>
              <Notice mensaje={notice.mensaje} color={notice.color} />
            </Suspense>
          </>
          :
          <>
          </>}
        </section>
    </section>
  )
}

export default Login