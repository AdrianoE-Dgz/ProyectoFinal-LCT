import { useNavigate, useOutletContext } from 'react-router-dom';
import { registUser } from '/src/httpRequests';
import './Register.css'

function Register() {
  const navigate = useNavigate();
  const { authCallback } = useOutletContext();

  const registerUser = async (e) => {
    e.preventDefault();

    const newUser = {
      nombre: e.target.registerName.value,
      usuario: e.target.registerUsername.value,
      correo: e.target.registerEmail.value,
      password: e.target.registerPassword1.value
    };

    const data = await registUser(newUser);

    if(!data.exito){
      console.error('Error');
      const notice = {mensaje: data.mensaje, color: 'danger'};

      authCallback({login: false, register: false, notice: notice})
    } else {
      const notice = {mensaje: data.mensaje, color: 'success'};

      authCallback({login: false, register: true, notice: notice})
    }
  };

  const goLogin = () => {
    navigate('/Auth/Login');
  }

  return (
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
      <p className='text-center'>¿Ya tienes una cuenta? <a href='' className='text-primary' onClick={goLogin}>Inicia Seción</a></p>
    </>
  )
}

export default Register