import { lazy, Suspense, useState } from 'react';
import { useDatosUsuario } from '/src/hooks/useDatosUsuario';
import { useDatosPedidoUser } from '/src/hooks/useDatosPedidoUser';
import { actualizarFechaPedido, borrarPedido } from '/src/httpRequests';
import './Userpage.css'
import { useEffect } from 'react';

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Userpage() {
  const { usuario, errorUser } = useDatosUsuario();
  const { pedidos, error } = useDatosPedidoUser();
  
  const [ listaPedidos, setListaPedidos]=useState([]);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [errorCambio, setMensajeError] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(()=>{
    setListaPedidos(pedidos || []);
  }, [pedidos]);

  function modificarPedido(pedido) {
    setPedidoSeleccionado({
      ...pedido
    });
  }

  async function eliminarPedido(pedido) {
    try{
        const resultado = await borrarPedido(pedido.id);
        if(resultado.exito){
          setMensajeExito(resultado.mensaje);
          setMensajeError(null);

          setListaPedidos(prev => prev.filter(p => p.id !== pedido.id));
        }
        else{
          setMensajeError("No se pudieron borrar los datos");
          setMensajeExito(null);
        }
    }catch(error){
        setMensajeError("No se pudieron borrar los datos");
        setMensajeExito(null);
    }finally{
            setPedidoSeleccionado(null);
        }
  }

  async function guardarCambios() {
    try{
      console.log(pedidoSeleccionado);
      const resultado = await actualizarFechaPedido(pedidoSeleccionado.id, pedidoSeleccionado.fechaEntrega, pedidoSeleccionado.direccion);
      if(resultado.exito){
        setMensajeExito(resultado.mensaje);
        setMensajeError(null);

        setListaPedidos(prev => prev.map(p => p.id === pedidoSeleccionado.id ? { ...p, ...pedidoSeleccionado} : p));
      }
      else{
        setMensajeError("No se pudieron editar los datos");
        setMensajeExito(null);
      }
    }catch(error){
      setMensajeError("No se pudieron editar los datos");
      setMensajeExito(null);
    }finally{
      setPedidoSeleccionado(null);
    }
  }

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

            {errorCambio && (
              <Notice mensaje={errorCambio} color='danger' />
            )}

            {mensajeExito && (
              <Notice mensaje={mensajeExito} color='success' />
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
                  <th>Direccion</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {listaPedidos?.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      <span className="badge bg-secondary">
                        {pedido.id}
                      </span>
                    </td>

                    <td>
                      <ul>
                        {pedido.contenido?.map((currentValue, index) => (
                          <li key={index}>
                            {currentValue}
                          </li>
                        ))}
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

                    <td>
                      {pedido.direccion}
                    </td>

                    <td>
                      <div className="d-flex flex-column gap-2">
                        <button className="btn btn-warning btn-sm" onClick={() => modificarPedido(pedido)}>
                          Modificar
                        </button>

                        <button className="btn btn-danger btn-sm" onClick={() => eliminarPedido(pedido)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {pedidoSeleccionado && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,.5)' }} >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Modificar Pedido #{pedidoSeleccionado.id}
                </h5>

                <button type="button" className="btn-close" onClick={() => setPedidoSeleccionado(null)} />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Fecha de Entrega
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={
                      pedidoSeleccionado.fechaEntrega
                        ?.split('T')[0]
                    }
                    onChange={(e) =>
                      setPedidoSeleccionado({
                        ...pedidoSeleccionado,
                        fechaEntrega: e.target.value
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Dirección
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={pedidoSeleccionado.direccion}
                    onChange={(e) =>
                      setPedidoSeleccionado({
                        ...pedidoSeleccionado,
                        direccion: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setPedidoSeleccionado(null)}>
                  Cancelar
                </button>

                <button className="btn btn-success" onClick={guardarCambios} >
                  Guardar Cambios
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Userpage;