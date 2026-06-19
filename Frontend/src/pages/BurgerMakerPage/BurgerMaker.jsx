import { lazy, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import './BurgerMaker.css'

import TickerImage from '/src/assets/images/Ticket.svg'
import BunTopImage from '/src/assets/images/Bun-Top.svg'
import BunBottomImage from '/src/assets/images/Bun-Bottom.svg'


const ToppingsCarousel = lazy(() =>
  import('/src/components/ToppingsCarouselComponent/ToppingsCarousel.jsx')
);

function BurgerMaker() {
  const toppingCarousel = [1,2,3,4,5,6,7];
  const { setBurger } = useContext(Context);
  const navigate = useNavigate();

  const GuardarBurger = () => {
    const vector = obtenerIngredientes();

    if(vector.length === 0){
      console.error('Hamburguesa vacia')
    } else {
      setBurger(vector);
      navigate('/cobro');
    }
  }

  const obtenerIngredientes = () => {
    const vector = [];

    const carruseles = document.querySelectorAll('[id^="toppingsCarousel"]');
    carruseles.forEach((carrusel /*, indice */) => {
      const activo = carrusel.querySelector('.carousel-item.active');
      if (!activo) return;

      const imagen = activo.querySelector('img');
      if (imagen) {
        // console.log(
        //   `Carrusel ${indice + 1}:`,
        //   imagen.getAttribute('value')
        // );
        vector.push(imagen.getAttribute('value'));
      }
      // else {
      //   console.log(
      //     `Carrusel ${indice + 1}: Nada`
      //   );
      // }
    });

    return vector;
  };
  
  useEffect(() => {
    document.addEventListener('slid.bs.carousel', obtenerIngredientes);

    return () => {
      document.removeEventListener(
        'slid.bs.carousel',
        obtenerIngredientes
      );
    };

  }, []);

  return (
    <section id="generalContainer">
      <div id='ticket' style={{backgroundImage: `url(${TickerImage})`}} className='text-center'>
        <div id='burger-cont' className='row'>
          <div className='col-12'>
            <img id='bun-top' src={BunTopImage} />
          </div>
          {toppingCarousel.map((id) => (
            <div className='col-12' key={id}>
            <ToppingsCarousel
              key={id}
              number={id}
            />
            </div>
          ))}
          <div className='col-12'>
            <img id='bun-bottom' src={BunBottomImage} />
          </div>
        </div>
      </div>
      <button className='btn btn-primary' onClick={GuardarBurger}>ordenar</button>
    </section>
  )
}

export default BurgerMaker