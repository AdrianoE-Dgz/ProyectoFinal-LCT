import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useRef, lazy, useState } from 'react'
import { Context } from "/src/Context.jsx";
import { makeOrder } from '/src/httpRequests';
import './Payment.css'

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Payment() {
  const navigate = useNavigate();
  const [ precio, setPrecio ] = useState(null);
  const { burger, setBurger } = useContext(Context);
  const direccionRef = useRef('');
  const fechaRef = useRef('');

  useEffect(() => {
    const orden = localStorage.getItem('orden');
    if(!orden){
      setBurger([]);
      return;
    }
    if(!burger || burger.length === 0) return;

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
      <form onSubmit={realizarPedido}>
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