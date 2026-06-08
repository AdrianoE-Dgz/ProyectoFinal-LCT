import { lazy } from 'react'
import './BurgerMaker.css'

import TickerImage from '/src/assets/images/Ticket.svg'
import BunTopImage from '/src/assets/images/Bun-Top.svg'
import BunBottomImage from '/src/assets/images/Bun-Bottom.svg'

const ToppingsCarousel = lazy(() => import('/src/components/ToppingsCarouselComponent/ToppingsCarousel.jsx'))

function BurgerMaker() {
  const toppingCarousel = [1,2,3,4,5,6,7];

  return (
    <section id="generalContainer">
      <p>BurgerMaker Works!</p>
      <div className='text-center position-relative'>
        <img id='ticket' src={TickerImage} />
        <img id='bun-top' src={BunTopImage}/>
       
        {toppingCarousel.map((id) => <ToppingsCarousel key={id} number={id} />)}

        <img id='bun-bottom' src={BunBottomImage}/>
      </div>

      
    </section>
  )
}

export default BurgerMaker