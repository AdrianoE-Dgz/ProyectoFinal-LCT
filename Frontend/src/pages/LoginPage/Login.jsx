import { useNavigate, useOutletContext } from 'react-router-dom';
import { logUser } from '/src/httpRequests';
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const { authCallback } = useOutletContext();

  const loginUser = async (e) => {
    e.preventDefault();

    const username = e.target.loginUsername.value;
    const password= e.target.loginPassword.value;

    const data = await logUser(username, password);

    if(!data.exito){
      console.error('Error');
      const notice = {mensaje: data.mensaje, color: 'danger'};

      authCallback({login: false, register: false, notice: notice})
    } else {
      const objUser = {nombre: localStorage.getItem('nombre'), rol: localStorage.getItem('rol')};
      const notice = {mensaje: data.mensaje, color: 'success'};

      authCallback({login: true, register: false, user: objUser, notice: notice})
    }
  };

  const goRegister = () => {
    navigate('/Auth/Register');
  }

  return (
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
      <p className='text-center'>¿No tienes una cuenta? <a href='' className='text-primary' onClick={goRegister}>Registrate</a></p>
    </>
            
  )
}

export default Login