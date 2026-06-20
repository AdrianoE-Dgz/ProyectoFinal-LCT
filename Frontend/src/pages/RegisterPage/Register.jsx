import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { registUser } from '/src/httpRequests';
import './Register.css'

function Register() {
  const [logName, setName] = useState(null);
  const [logUsername, setUsername] = useState(null);
  const [logEmail, setEmail] = useState(null);
  const [logPassword, setPassword] = useState(null);
  const [confirmPassword, setConfPassword] = useState(null);
  const [nameNotice, setNameNotice] = useState('Nombre vacio');
  const [userNotice, setUserNotice] = useState('Usuario vacio');
  const [emailNotice, setEmailNotice] = useState('Correo vacio');
  const [passwordNotice, setPasswordNotice] = useState('Contraseña vacia');
  const [confirmNotice, setConfirmNotice] = useState('Contraseñas no coinciden');
  const [disable, setDisable] = useState(null)
  const { authCallback } = useOutletContext();

  const handleName = (e) => {
    const text = e.target.value;

    setName(text);

    if(text === ''){
      setNameNotice('Nombre vacio');
      return;
    }

    if(text.length > 45){
      setNameNotice('Nombre no puede ser mayor a 45 caracteres');
    } else {
      setNameNotice(null);
    }
  }

  const handleUsername = (e) => {
    const text = e.target.value;

    setUsername(text);

    if(text === ''){
      setUserNotice('Usuario vacio');
      return;
    }

    if(text.length < 3){
      setUserNotice('Usuario no puede ser menor a 3 caracteres');
    } else {
      if(text.length > 12){
        setUserNotice('Usuario no puede ser mayor a 12 caracteres');
      } else {
        setUserNotice(null)
      }
    }
  }

  const handleEmail = (e) => {
    const text = e.target.value;
    const regex = new RegExp('^[\\w\\-\\.]+@(gmail)+\\.+(com)$');

    setEmail(text);

    if(text === ''){
      setEmailNotice('Correo vacio');
      return;
    }

    if(!text || !regex.test(text)){
      setEmailNotice('Correo no es de Gmail');
    } else {
      setEmailNotice(null)
    }
  }

  const handlePassword = (e) => {
    const text = e.target.value;
    const regex = new RegExp('^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$');

    setPassword(text);

    if(text === ''){
      setPasswordNotice('Contraseña vacia');
      return;
    }

    if(!regex.test(text)){
      setPasswordNotice('Contraseña debe de ser entre 8 y 16 caracteres y debe tener al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo');
    } else {
      setPasswordNotice(null);
    }

    if(text !== confirmPassword){
      setConfirmNotice('Contraseñas no coinciden');
    } else {
      setConfirmNotice(null);
    }
  }

  const handleConfirm = (e) => {
    const text = e.target.value;

    setConfPassword(text);

    if(text !== logPassword){
      setConfirmNotice('Contraseñas no coinciden');
    } else {
      setConfirmNotice(null)
    }
  }

  const registerUser = async (e) => {
    e.preventDefault();

    const newUser = {
      nombre: logName,
      usuario: logUsername,
      correo: logEmail,
      password: logPassword
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

  useEffect(() => {
    if(nameNotice || userNotice || emailNotice || passwordNotice || confirmNotice ){
      setDisable(true);
    } else {
      setDisable(false);
    }
  })

  return (
    <>
      <form id="registerForm" onSubmit={registerUser}>
        <div className="mb-3">
          <label for="registerName" className="form-label">Nombre</label>
          <input type="text" className="form-control" value={logName} onChange={handleName} />
          { nameNotice !== null ?
            <div class="form-text">{nameNotice}</div>
            :
            <></>
          }
        </div>
        <div className="mb-3">
          <label for="registerUsername" className="form-label">Usuario</label>
          <input type="text" className="form-control" value={logUsername} onChange={handleUsername} />
          { userNotice !== null ?
            <div class="form-text">{userNotice}</div>
            :
            <></>
          }
        </div>
        <div className="mb-3">
          <label for="registerEmail" className="form-label">Correo</label>
          <input type="email" className="form-control" value={logEmail} onChange={handleEmail} />
          { emailNotice !== null ?
            <div class="form-text">{emailNotice}</div>
            :
            <></>
          }
        </div>
        <div className="mb-3">
          <label for="registerPassword1" className="form-label">Contraseña: </label>
          <input type="password" className="form-control" value={logPassword} onChange={handlePassword} />
          { passwordNotice !== null ?
            <div class="form-text">{passwordNotice}</div>
            :
            <></>
          }
        </div>
        <div className="mb-3">
          <label for="registerPassword2" className="form-label">Confirmar Contraseña: </label>
          <input type="password" className="form-control" value={confirmPassword} onChange={handleConfirm} />
          { confirmNotice !== null ?
            <div class="form-text">{confirmNotice}</div>
            :
            <></>
          }
        </div>
        <div className='text-center mb-3'>
          <button type="submit" className="btn btn-primary" disabled={disable}>Registrarse</button>
        </div>
      </form>
      <p className='text-center'>¿Ya tienes una cuenta? <Link className='text-primary' to='/Auth/Login'>Iniciar Sesión</Link></p>
    </>
  )
}

export default Register