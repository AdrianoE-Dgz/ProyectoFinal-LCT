import { Outlet, Navigate } from 'react-router-dom'
import { isUser } from '/src/httpRequests.jsx'
import { useEffect, useState } from 'react';

const ProtectedUser = () => {
  const [isUser, setIsUser] = useState(false);

  const checkUser = async () => {
    const response = await isUser();

    if(response){
      setIsUser(true);
    }
    return;
  }
    
  useEffect(() => {
    checkUser();
  });

  return (
    <>
      { isUser ?
        <Outlet />
        :
        <Navigate to="/login" />
      }
    </>
  );
}
export default ProtectedUser