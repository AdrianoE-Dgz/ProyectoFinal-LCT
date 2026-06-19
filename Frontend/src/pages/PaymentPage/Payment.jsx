
import { lazy, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import './Payment.css'

function Payment() {
  const { burger } = useContext(Context);

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

    console.log(stringBurger);
  }

  return (
    <section id="generalContainer">
      <p>Payment Works!</p>
      <button onClick={realizarPedido}>Pedido</button>
    </section>
  )
}

export default Payment