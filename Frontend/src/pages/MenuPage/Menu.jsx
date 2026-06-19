import { Link, Outlet } from 'react-router-dom'
import './Menu.css'
import { useDatosProductos } from '/src/hooks/useDatosProductos';
import TarjetaMenu from '/src/components/tarjetaMenu/tarjetaMenu';

function Menu() {
  const { productos, error } = useDatosProductos();
  return (
    <section id="generalContainer">
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