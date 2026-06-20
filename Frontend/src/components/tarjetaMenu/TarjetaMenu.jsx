import './TarjetaMenu.css'

function TarjetaMenu({ imagen, children }) {
  return (
    <>
      <div className='menuTarjeta'>
        <img src={imagen} alt="Imagen" />
        { children }
      </div>
    </>
  )
}

export default TarjetaMenu;