import { Link } from 'react-router-dom'
import './Homepage.css'

import logo from '/src/assets/images/logo.jpg'
import fondo from '/src/assets/images/fondo.jpg'

function Homepage() {
  return (
    <section
      id='HomeCont'
      className="d-flex flex-column justify-content-start align-items-center general-container"
      style={{
        '--background-image': `url(${fondo})`
      }}
    >
      <img
        src={logo}
        className="homepage-logo mb-4"
        alt="Logo"
      />

      <div className="buttons-container">
        <Link to="/CrearHamburguesa" className="btn creation-btn"> Crear Hamburguesa </Link>
        <Link to="/Menu" className="btn menu-btn"> Vea nuestro menu </Link>
      </div>
    </section>
  )
}

export default Homepage