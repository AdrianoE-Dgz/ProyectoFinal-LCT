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
  const direccionRef = new useRef('');
  const fechaRef = new useRef('');

  useEffect(() => {
    const orden = localStorage.getItem('orden') || null;
    fetch(`http//:localhost:3000/api/productos/obtenerPrecioPedido`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: {
        contenido: burger
      }
    })
      .then((respuesta) => (setPrecio(respuesta)))
      .finally(console.log(precio))
      .catch((error) => console.error(error));

    if(!orden || !precio) {
      setBurger(null);
      return;
    }
  }, []);

  const realizarPedido = async (e) => {
    e.preventDefault();
    let stringBurger = '';

    burger.map((value, index) => {
      console.log(index,": ", value);
      stringBurger += `${value},`
    })

    stringBurger = stringBurger.slice(0, -1);

    const hoy = new Date();
    const entrega = fechaRef.current.value;
    const direccion = direccionRef.current.value;

    const data = await makeOrder(stringBurger, hoy, entrega, 999, direccion);

    console.log(data);
    if(data.exito){
      setBurger(null);
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