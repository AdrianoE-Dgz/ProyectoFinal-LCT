import PropTypes from 'prop-types';
import './Notice.css'

function Notice({ color, classes, mensaje }) {
  return (
    <>
      <div className={`alert alert-${color} alert-dismissible ${classes} mb-0`} role="alert">
       <div>{mensaje}</div>
       <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </>
  )
}

Notice.propTypes = {
    mensaje: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning', 'info']).isRequired,
    classes: PropTypes.string
};

export default Notice