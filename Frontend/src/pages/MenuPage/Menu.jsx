import { Link, Outlet } from 'react-router-dom'
import './Menu.css'

function Menu() {
  return (
    <section id="generalContainer">
      <p>Menu Works!</p>
      <Link className='btn btn-primary' to={'/Menu/CrearHamburguesa'}>Crear mi Hamburguesa</Link>
      <Outlet /> 
    </section>
  )
}

export default Menu