import { useParams, Link, Outlet } from 'react-router-dom'
import './Userpage.css'
import { datosPedidosUser, datosUser } from '/src/httpRequests';
import { useEffect, useState } from 'react';

function Userpage() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const { username } = useParams(); 

  useEffect(()=>{
    cargarPedidos();
    cargarUsuario();
  }, []);

  const cargarPedidos = async () => {
    const resultado = await datosPedidosUser();
    if(resultado.exito){
      setPedidos(resultado.pedidos);
    }
    else{
      setError(resultado.mensaje);
    }
  };

  const cargarUsuario = async () => {
    const resultadoUsuario = await datosUser();
    if(resultadoUsuario.exito){
      setUsuario(resultadoUsuario.usuario);
    }
    else{
      setErrorUser(resultadoUsuario.mensaje);
    }
  };
  
  return (
    <section id="generalContainer">
      <div id="userCont" className='card'>
        <h1>Datos del Usuario</h1>
        {usuario && (
          <div className='user-info'>
            <p><strong>Usuario:</strong> {usuario.user}</p>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
          </div>
        )}
        {errorUser && <p>{errorUser}</p>}
        <h2>Mis Pedidos</h2>
        {error && <p>{error}</p>}

        <table className='table table-bordered table-striped rounded'>
          <thead>
            <tr>
              <th id='idCol'>ID</th>
              <th>Contenido</th>
              <th>Fecha Pedido</th>
              <th>fecha de Entrega</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.contenido}</td>
                <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                <td>{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
                <td>{pedido.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Userpage