import { useParams, Link, Outlet } from 'react-router-dom'
import './Userpage.css'
import { datosPedidosUser, datosUser } from '/src/httpRequests';
import { useEffect, useState } from 'react';
import { useDatosUsuario } from '/src/hooks/useDatosUsuario';
import { useDatosPedidoUser } from '/src/hooks/useDatosPedidoUser';

function Userpage() {
  const { usuario, errorUser } = useDatosUsuario();
  const { pedidos, error } = useDatosPedidoUser();
  const { username } = useParams(); 
  
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
                <td>
                  <ul>
                  {
                    pedido.contenido.map((currentValue, index) => (
                    <li key={index}>
                      {currentValue}
                    </li>
                    ))
                  }
                  </ul>
                </td>
                <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                <td>{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
                <td>${pedido.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Userpage