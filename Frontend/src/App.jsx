import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Pages Import
const Homepage = lazy(() => import('./components/HomepageComponent/Homepage.jsx'));
const Login = lazy(() => import('./components/LoginComponent/Login.jsx'));
const NotFound = lazy(() => import('./components/NotFoundComponent/NotFound.jsx'));

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Navbar</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-lg-flex flex-row" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                
              </ul>
              <ul className="navbar-nav flex-grow-1 justify-content-end">
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">Inicia Sesión</Link>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      
    </>
  )
}

export default App
