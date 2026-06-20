import { lazy } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useDatosProductos } from '/src/hooks/useDatosProductos';
import './Menu.css'

const TarjetaMenu = lazy(() => import('/src/components/tarjetaMenu/tarjetaMenu'));

function Menu() {
  const { productos, error } = useDatosProductos();
  return (
    <section id='MenuCont' className="general-container">
      <h2>Menu</h2>
      <div className='divMenu'>
        {productos.filter(producto => producto.tipo>2).map((producto)=>(
          <TarjetaMenu key={producto.id} imagen={producto.imagen}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
          </TarjetaMenu>
        ))}
      </div>
      <Link className='btn btn-primary' to={'/CrearHamburguesa'}>Crear mi Hamburguesa</Link>
      <Outlet /> 
    </section>
  )
}

export default Menu