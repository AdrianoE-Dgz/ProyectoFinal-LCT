
import { lazy, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import './Payment.css'

function Payment() {
  const { burger } = useContext(Context);

  useEffect(() => {
    console.log(burger);
  });

  return (
    <section id="generalContainer">
      <p>Payment Works!</p>
    </section>
  )
}

export default Payment