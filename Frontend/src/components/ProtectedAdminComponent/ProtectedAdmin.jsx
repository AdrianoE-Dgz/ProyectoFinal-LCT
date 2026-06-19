import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { isAdmin } from '/src/httpRequests.jsx'
import { useEffect, useState } from 'react';

function ProtectedAdmin() {
  const [isAdministrador, setIsAdmin] = useState(null);
  const location = useLocation();

  const checkAdmin = async () => {
    try{
      const response = await isAdmin();
      setIsAdmin(!!response);
    }catch(error){
      setIsAdmin(false);
    }
  }
    
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  if(isAdministrador === null){
    return <p>Cargando...</p>;
  }

  return (
    <>
      { isAdministrador ?
        <Outlet />
        :
        <Navigate to="/Auth/Login" />
      }
    </>
  );
}

export default ProtectedAdmin