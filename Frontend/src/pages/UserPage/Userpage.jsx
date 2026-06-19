import { lazy, Suspense } from 'react';
import { useDatosUsuario } from '/src/hooks/useDatosUsuario';
import { useDatosPedidoUser } from '/src/hooks/useDatosPedidoUser';
import './Userpage.css'

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Userpage() {
  const { usuario, errorUser } = useDatosUsuario();
  const { pedidos, error } = useDatosPedidoUser();
  
  return (
    <section id='UserPageCont' className="general-container container py-5">
      <div id="userCont" className="card shadow-lg border-0">
        <div className="card-body p-4">

          <h1 className="text-center mb-4 text-primary">
            Datos del Usuario
          </h1>

          {usuario && (
            <div className="user-info card shadow mb-4">
              <div className="card-body d-flex text-center justify-content-around align-items-center">
                <p>
                  <strong>Usuario:</strong>{' '}
                  <span className="badge bg-primary">
                    {usuario.user}
                  </span>
                </p>

                <p>
                  <strong>Nombre:</strong> {usuario.nombre}
                </p>

                <p>
                  <strong>Correo:</strong> {usuario.correo}
                </p>
              </div>
            </div>
          )}

          {errorUser && (
            <Notice mensaje={errorUser} color='danger' />
          )}

          <h2 className="mb-3 text-primary">
            Mis Pedidos
          </h2>

          {error && (
            <Notice mensaje={error} color='danger' />
          )}

          <div className="table-responsive">
            <table className='table table-bordered table-striped rounded'>
              <thead className="table-primary">
                <tr>
                  <th id='idCol'>ID</th>
                  <th>Contenido</th>
                  <th>Fecha Pedido</th>
                  <th>Fecha Entrega</th>
                  <th>Precio</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      <span className="badge bg-secondary">
                        {pedido.id}
                      </span>
                    </td>

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

                    <td>
                      {new Date(
                        pedido.fechaPedido
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {new Date(
                        pedido.fechaEntrega
                      ).toLocaleDateString()}
                    </td>

                    <td className="fw-bold text-success">
                      ${pedido.precio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Userpage