import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useRef, lazy, useState } from 'react'
import { Context } from "/src/Context.jsx";
import { makeOrder, datosProductos } from '/src/httpRequests';
import './Payment.css'
import { Suspense } from 'react';

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Payment() {
  const navigate = useNavigate();
  const [ precio, setPrecio ] = useState(1);
  const [ burgerList, setBurgerList ] = useState([]);
  const { burger, setBurger } = useContext(Context);
  const direccionRef = useRef('');
  const fechaRef = useRef('');

  useEffect(() => {
    const orden = localStorage.getItem('orden');
    if(!orden){
      return;
    }

    if(!Array.isArray(burger) || !burger || burger.length === 0) return;

    const getContenido = async () => {
      const data = await datosProductos();

      if (!data?.productos) return;
      console.log(data.productos);

      const listaProductos=burger.map(id => 
        data.productos.find(prod => prod.id === Number(id))
      ).filter(Boolean);

      setBurgerList(listaProductos);
    };
    getContenido();

    fetch(`http://localhost:3000/api/productos/obtenerPrecioPedido`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contenido: burger
      })
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        if(!data || data <= 0){
          setPrecio(0);
          return;
        }
        setPrecio(data);
        console.log(data);
      })
      .catch(error => console.error(error))
      .finally(() => console.log("Fetch listo"));
  }, [burger]);

  const realizarPedido = async (e) => {
    e.preventDefault();
    if(!burger || burger.length===0 || !precio || precio===0) return;
    
    const stringBurger = burger.join(',');

    const hoy = new Date();
    const entrega = fechaRef.current.value;
    const direccion = direccionRef.current.value;

    const data = await makeOrder(stringBurger, hoy, entrega, direccion, precio);

    console.log(data);
  }

  const goBurgerMaker = () => {
    navigate('/CrearHamburguesa');
  }

  return (
    <section id='PaymentCont' className="general-container">
    {burger?.length>0 ?
      <div id="paymentForm" className='card'>
        <div>
          <h1 className='text-primary'>Para terminar tu pedido</h1>
          <p className='font-dokyo'>Contenido de su pedido: </p>
          {
            burgerList.length>0 ?
              burgerList.map((prod, index) => (
                <li key={index}>{prod.nombre}</li>
              ))
            :
              <p>Cargando...</p>
          }
          <p><span className='font-dokyo'>Total a pagar: </span> ${precio} </p>
        </div>
        <form onSubmit={realizarPedido} className='card'>
          <h3 className='text-primary'>Llene este formulario</h3>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" ref={direccionRef} />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Entrega</label>
            <input type="date" className="form-control" ref={fechaRef} />
          </div>
            <div className='text-center mb-3'>
            <button type="submit" className="btn btn-primary">Ordenar</button>
          </div>
        </form>
      </div>
    :
      <>
        <Notice mensaje="No se pudo procesar el pago, intente realizar su pedido nuevamente" color="danger" />
        <button className="btn btn-primary text-center" onClick={goBurgerMaker}>Regresar a realizar Hamburguesa</button>
      </>
    }
    </section>
  )
}

export default Payment