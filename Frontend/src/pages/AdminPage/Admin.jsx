import { useDatosAllPedidos } from '/src/hooks/useDatosAllPedidos';
import { useDatosPedidoId } from '/src/hooks/useDatosPedidoId';
import './Admin.css'
import { lazy, Suspense, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Admin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [ inputId, setInputId ] = useState("");

  const { pedidos, error: errorAll, loading: loadingAll } = useDatosAllPedidos();
  const { pedido, error: errorOne, loading: loadingOne } = useDatosPedidoId(id);

  const pedidosListos = pedidos || [];
  const error = errorAll || errorOne;
  const data = id ? (pedido ? [pedido] : []) : pedidosListos;

  const cargando = loadingOne || loadingAll;

  const busqueda = () => {
    if(inputId.trim()===""){
      navigate("/Manage");
    }
    else{
      if(isNaN(Number(inputId)) || Number(inputId) <= 0)
        return;
      navigate(`/Manage?id=${Number(inputId)}`);
    }
  }

  if(cargando){
    return <div>Cargando...</div>
  }

  return (
    <section id='AdminCont' className="general-container container py-5">
      <div id="userCont" className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h2 className="mb-3 text-primary">
            Lista de Pedidos
          </h2>

          <div className="d-flex gap-2 flex-wrap mb-4">
            <input type="number" className='form-control input-busqueda' placeholder='Busca un ID' value={inputId} onChange={(e) => setInputId(e.target.value)} />
            <button className='btn btn-primary' onClick={busqueda}>Buscar</button>
          </div>

          {error && (
            <Notice mensaje={error} color='danger' />
          )}

          <div className="table-responsive">
            <table className='table table-bordered table-striped rounded'>
              <thead className="table-primary">
                <tr>
                  <th id='idCol'>ID</th>
                  <th>ID Cliente</th>
                  <th>Contenido</th>
                  <th>Fecha Pedido</th>
                  <th>Fecha Entrega</th>
                  <th>Direccion</th>
                  <th>Precio</th>
                </tr>
              </thead>

              <tbody>
                {data.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      <span className="badge bg-secondary">
                        {pedido.id}
                      </span>
                    </td>

                    <td className="fw-bold text-success">
                      {pedido.usuarios_id}
                    </td>

                    <td>
                  <ul>
                  {
                    (pedido.contenido || []).map((currentValue, index) => (
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
                      {pedido.direccion}
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

export default Admin