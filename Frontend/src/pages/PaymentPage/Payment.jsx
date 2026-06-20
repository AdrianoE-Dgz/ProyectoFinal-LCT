import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useRef, lazy, useState } from 'react'
import { Context } from "/src/Context.jsx";
import { makeOrder, datosProductos } from '/src/httpRequests';
import './Payment.css'

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Payment() {
  const navigate = useNavigate();
  const [ precio, setPrecio ] = useState(1);
  const [ burgerList, setBurgerList ] = useState([]);
  const { burger, setBurger } = useContext(Context);
  const direccionRef = useRef('');
  const fechaRef = useRef('');

  useEffect(() => {
    if(!burger || burger.length === 0) return;

    const getContenido = async () => {
      const data = await datosProductos();

      console.log(data.productos);

      const listaProductos=burger.map(id => 
        data.productos.find(prod => prod.id === Number(id))
      ).filter(Boolean);

      setBurgerList(listaProductos);
    };
    getContenido();

    fetch(`https://proyectofinal-lct.onrender.com/api/productos/obtenerPrecioPedido`, {
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
          setPrecio(null);
          setBurger([]);
          return;
        }
        setPrecio(data);
        console.log(data);
      })
      .catch(error => console.error(error))
      .finally(() => console.log("Fetch listo"));
  }, [burger, setBurger]);

  const realizarPedido = async (e) => {
    e.preventDefault();
    if(!burger || !precio) return;
    let stringBurger = '';

    burger.map((value, index) => {
      console.log(index,": ", value);
      stringBurger += `${value},`
    })

    stringBurger = stringBurger.slice(0, -1);

    const hoy = new Date();
    const entrega = fechaRef.current.value;
    const direccion = direccionRef.current.value;

    const data = await makeOrder(stringBurger, hoy, entrega, direccion, precio);

    console.log(data);
    if(data.exito){
      setBurger([]);
    }
  }

  const goBurgerMaker = () => {
    navigate('/CrearHamburguesa');
  }

  return (
    <section id='PaymentCont' className="general-container">
    { burger ?
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
        <a href='' className='btn btn-primary text-center' onClick={goBurgerMaker}>Regresar a realizar Hamburguesa</a>
      </>
    }
    </section>
  )
}

export default Payment