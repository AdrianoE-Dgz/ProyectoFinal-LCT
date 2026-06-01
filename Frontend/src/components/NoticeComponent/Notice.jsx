import './Notice.css'

function Notice(props) {
  return (
    <>
      <div className={`alert alert-${props.color} alert-dismissible ${props.posicion} mb-0`} role="alert">
       <div>{props.mensaje}</div>
       <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </>
  )
}

export default Notice