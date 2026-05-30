import './BurgerMaker.css'
import TickerImage from '/src/assets/images/Ticket.svg'
import BBQImage from '/src/assets/images/BBQ.svg'
import KetchupImage from '/src/assets/images/Ketchup.svg'
import MustardImage from '/src/assets/images/Mustard.svg'
import MayoImage from '/src/assets/images/Mayo.svg'
import BunTopImage from '/src/assets/images/Bun-Top.svg'
import BunBottomImage from '/src/assets/images/Bun-Bottom.svg'
import LettuceImage from '/src/assets/images/Lettuce.svg'
import CheeseImage from '/src/assets/images/Cheese.svg'

function BurgerMaker() {
  return (
    <section id="generalContainer">
      <p>BurgerMaker Works!</p>
      <div className='text-center position-relative'>
        <img src={TickerImage} />
        <img id='bun-bottom' src={BunBottomImage} className='topping'/>
        <div id="carousel1" className='topping'>
          <div class="carousel carousel-dark slide">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="10000">
                <img src={LettuceImage} />
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
              <div class="carousel-item">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      
    </section>
  )
}

export default BurgerMaker