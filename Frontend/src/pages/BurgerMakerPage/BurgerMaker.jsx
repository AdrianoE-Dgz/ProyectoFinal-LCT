import { lazy, useEffect } from 'react'
import './BurgerMaker.css'

import TickerImage from '/src/assets/images/Ticket.svg'
import BunTopImage from '/src/assets/images/Bun-Top.svg'
import BunBottomImage from '/src/assets/images/Bun-Bottom.svg'

const ToppingsCarousel = lazy(() =>
  import('/src/components/ToppingsCarouselComponent/ToppingsCarousel.jsx')
)

function BurgerMaker() {
  const toppingCarousel = [1,2,3,4,5,6,7];
  
  useEffect(() => {
    const obtenerIngredientes = () => {
      const carruseles = document.querySelectorAll('[id^="toppingsCarousel"]');
      carruseles.forEach((carrusel, indice) => {
        const activo = carrusel.querySelector('.carousel-item.active');
        if (!activo) return;
        const imagen = activo.querySelector('img');
        if (imagen) {
          console.log(
            `Carrusel ${indice + 1}:`,
            imagen.getAttribute('value')
          );
        }
        else {
          console.log(
            `Carrusel ${indice + 1}: Nada`
          );
        }

      });
    };

    obtenerIngredientes();

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
      <p>BurgerMaker Works!</p>
      <div className='text-center position-relative'>
        <img id='ticket' src={TickerImage} />
        <img id='bun-top' src={BunTopImage} />
        {toppingCarousel.map((id) =>
          <ToppingsCarousel
            key={id}
            number={id}
          />
        )}
        <img id='bun-bottom' src={BunBottomImage} />
      </div>
      <button className='btn btn-primary' onClick={}>ordenar</button>
    </section>
  )
}

export default BurgerMaker