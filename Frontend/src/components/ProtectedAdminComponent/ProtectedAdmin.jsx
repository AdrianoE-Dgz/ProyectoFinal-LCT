import { Outlet, Navigate } from 'react-router-dom'
import { isAdmin } from '/src/httpRequests.jsx'
import { useEffect, useState } from 'react';

function ProtectedAdmin() {
  const [isAdministrador, setIsAdmin] = useState(false)

  const checkAdmin = async () => {
    const response = await isAdmin();

    if(response){
      setIsAdmin(true);
    }
    return;
  }
    
  useEffect(() => {
    checkAdmin();
  });

  return (
    <>
      { isAdministrador ?
        <Outlet />
        :
        <Navigate to="/login" />
      }
    </>
  );
}

export default ProtectedAdmin