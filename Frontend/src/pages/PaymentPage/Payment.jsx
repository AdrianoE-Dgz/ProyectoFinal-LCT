
import { lazy, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import { makeOrder } from '/src/httpRequests';
import './Payment.css'

function Payment() {
  const { burger, setBurger } = useContext(Context);

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
      <p>Payment Works!</p>
      <button className='btn btn-primary' onClick={realizarPedido}>Pedido</button>
    </section>
  )
}

export default Payment