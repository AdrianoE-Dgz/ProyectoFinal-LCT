import '/src/components/ToppingsCarouselComponent/ToppingsCarousel.css'

import BBQImage from '/src/assets/images/BBQ.svg'
import KetchupImage from '/src/assets/images/Ketchup.svg'
import MustardImage from '/src/assets/images/Mustard.svg'
import MayoImage from '/src/assets/images/Mayo.svg'
import LettuceImage from '/src/assets/images/Lettuce.svg'
import CheeseImage from '/src/assets/images/Cheese.svg'
import PattieImage from '/src/assets/images/Pattie1.svg';
import TomatoImage from '/src/assets/images/Tomato.svg'
import PickleImage from '/src/assets/images/Pickle.svg'

function ToppingsCarousel(props) {
  return (
    <>
      <div id={`toppingsCarousel${props.number}`} className="carousel carousel-dark slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={PattieImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={LettuceImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={CheeseImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={TomatoImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={PickleImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={KetchupImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={MustardImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={MayoImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <img src={BBQImage} className='toppingImage' />
          </div>
          <div className="carousel-item">
            <p className='m-0'>Nada</p>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target={`#toppingsCarousel${props.number}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#toppingsCarousel${props.number}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden"></span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ToppingsCarousel