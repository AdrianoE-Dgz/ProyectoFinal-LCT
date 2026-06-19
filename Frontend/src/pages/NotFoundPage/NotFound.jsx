import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <section id='NotFoundCont' className="d-flex flex-column justify-content-center align-items-center text-center general-container">
      <h1 className="error-code">404</h1>
      
      <h2 className="error-title">
        Página no encontrada
      </h2>

      <p className="error-message">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>

      <Link to="/" className="btn btn-warning error-button">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound