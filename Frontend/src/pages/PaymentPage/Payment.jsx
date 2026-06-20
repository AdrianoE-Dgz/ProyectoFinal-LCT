import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useRef, lazy, useState } from 'react'
import { Context } from "/src/Context.jsx";
import { makeOrder, datosProductos } from '/src/httpRequests';
import './Payment.css'

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));

function Payment() {
  const navigate = useNavigate();
  const [ precio, setPrecio ] = useState(1);
  const { burgerList, setBurgerList } = useState([]);
  const { burger, setBurger } = useContext(Context);
  const direccionRef = new useRef('');
  const fechaRef = new useRef('');

  useEffect(() => {
    const getContenido = async () => {
      const data = await datosProductos();

      console.log(data.productos);

      burger.map((id) => {
        console.log(Number(id));
        const valor = data.productos.find((prod) => ( prod.id === Number(id)));
        console.log("Valor: ", valor);

        if(valor){
          setBurgerList([ ...burgerList, valor.nombre ]);
        }
      });

      console.log("BurgerList", burgerList);
    }

    getContenido();
    // fetch(`http//:localhost:3000/api/productos/obtenerPrecioPedido`, {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: {
    //     contenido: burger
    //   }
    // })
    //   .then((respuesta) => (setPrecio(respuesta)))
    //   .finally(console.log(precio))
    //   .catch((error) => console.error(error));

    if(!precio) {
      setBurger(null);
    }

    return;
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
      <div id="paymentForm" className='card'>
        <div>
          <h1 className='text-primary'>Para terminar tu pedido</h1>
          <p className='font-dokyo'>Contenido de su pedido: </p>
          {
            burgerList ?
              burgerList.map((prod, index) => (
                <li key={index}>{prod}</li>
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