import './TarjetaMenu.css'

function TarjetaMenu({ imagen, children }) {
  return (
    <>
      <div className='menuTarjeta'>
        <img src={`/src/assets/images/${imagen}`} alt="Imagen" />
        { children }
      </div>
    </>
  )
}

export default TarjetaMenu;