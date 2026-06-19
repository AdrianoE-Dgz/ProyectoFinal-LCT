
import { lazy, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import { makeOrder } from '/src/httpRequests';
import './Payment.css'

function Payment() {
  const { burger, setBurger } = useContext(Context);
  const direccionRef = new useRef('');
  const fechaRef = new useRef('');

  useEffect(() => {
    console.log(burger);
  });

  const realizarPedido = async (e) => {
    e.preventDefault();
    let stringBurger = '';

    burger.map((value, index) => {
      console.log(index,": ", value);
      stringBurger += `${value},`
    })

    stringBurger = stringBurger.slice(0, -1);

    const data = await makeOrder(stringBurger, '00/00/00', '00/00/00', 999);

    console.log(data);
    if(data.exito){
      setBurger(null);
    }
  }

  return (
    <section id="generalContainer">
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
    </section>
  )
}

export default Payment