import '/src/components/ToppingsCarouselComponent/ToppingsCarousel.css'
import { useDatosProductos } from '/src/hooks/useDatosProductos';

function ToppingsCarousel(props) {
  const { productos } = useDatosProductos();

  return (
    <>
      <div id={`toppingsCarousel${props.number}`} className="carousel carousel-dark slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <p className='m-0'>Nada</p>
          </div>
          {
            productos.filter((producto) => (!(producto.tipo === 1)&&!(producto.tipo === 2))).map((producto) => (
              <div className="carousel-item" key={producto.id}>
                <img src={producto.imagen} className='toppingImage' value={producto.id} />
              </div>
            ))
          }
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