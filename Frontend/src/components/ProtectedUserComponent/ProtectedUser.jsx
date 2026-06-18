import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { isUser } from '/src/httpRequests.jsx'
import { useEffect, useState } from 'react';

const ProtectedUser = () => {
  const [esUser, setEsUser] = useState(null);
  const location = useLocation();

  const checkUser = async () => {
    try{
      const response = await isUser();
      setEsUser(!!response);
    }catch(error){
      setEsUser(false);
    }
  };
    
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if(esUser === null){
    return <p>Cargando...</p>;
  }

  return (
    <>
      { esUser ?
        <Outlet />
        :
        <Navigate to="/login" />
      }
    </>
  );
}
export default ProtectedUser