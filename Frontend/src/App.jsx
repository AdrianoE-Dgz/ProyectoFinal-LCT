import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import '/src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js';

// Para crear más pages se tiene que correr npx generate-react-cli page [Nombre]
// <-- Pages Import -->
const Homepage = lazy(() => import('/src/pages/HomePage/Homepage.jsx'));
const Login = lazy(() => import('/src/pages/LoginPage/Login.jsx'));
const Userpage = lazy(() => import('/src/pages/UserPage/Userpage.jsx'));
const Menu = lazy(() => import('/src/pages/MenuPage/Menu.jsx'));
const BurgerMaker = lazy(() => import('/src/pages/BurgerMakerPage/BurgerMaker.jsx'))
const AboutUs = lazy(() => import('/src/pages/AboutUsPage/AboutUs.jsx'))
const NotFound = lazy(() => import('/src/pages/NotFoundPage/NotFound.jsx'));

// Para crear más components se tiene que correr npx generate-react-cli component [Nombre]
// <-- Components Import -->
const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'));
const ProtectedRoute = lazy(() => import('/src/components/ProtectedRouteComponent/ProtectedRoute.jsx'))

// Custom Style Class
const navLinkStyles = ({ isActive }) => ({
  color: isActive ? 'blue' : 'black',
  textDecoration: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
});

function App() {
  const {user, setUser} = useContext(Context);
  const navigate = useNavigate();

  function handleLogout(){
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");

    setUser(null);
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Navbar</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-lg-flex flex-row" id="navbarNav">
              <ul className="navbar-nav">
                {/* Ligas del Navbar */}
                <li className="nav-item">
                  <NavLink className="nav-link" style={navLinkStyles} to="/">Inicio</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={navLinkStyles} to="/Menu">Menú</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={navLinkStyles} to="/Nosotros">Conocenos</NavLink>
                </li>
                
              </ul>
              {/* Inicio Sesion/Usuario */}
              <ul className="navbar-nav flex-grow-1 justify-content-end">
                <li className="nav-item">
                  {user ?
                    <div className='dropdown w-100'>
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.nombre}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><Link className="dropdown-item" to={`/${user.nombre}`}>Mi Cuenta</Link></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                      </ul>
                    </div>
                  :
                    <Link className="nav-link" to="/Login">Inicia Sesión</Link>
                  }
                </li>
              </ul>
            </div>
          </div>
      </nav>

      {/* Rutas a usar */}
      <Suspense fallback={
        <div id='Loading' className='w-100 d-flex justify-content-center align-items-center'>
          Cargando...
        </div>}
      >
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/CrearHamburguesa' element={<BurgerMaker />} />
              <Route path='/:username' element={<Userpage />}>
                {/* Rutas de User */}
              </Route>
            </Route>
            <Route path='/Menu' element={<Menu />} />
            <Route path='/Nosotros' element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* Notice sobre ser un proyecto escolar */}
      <Suspense fallback={<p className='fixed-bottom text-center'>Cargando Aviso...</p>}>
        <Notice mensaje="Este es un proyecto escolar sin fines de lucro" color="warning" posicion='fixed-bottom' />
      </Suspense>
    </>
  )
}

export default App
