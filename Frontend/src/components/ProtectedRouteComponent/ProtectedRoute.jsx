import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (props) => {
    let isAuthenticated = false;

    if(props.token != null || props.token != undefined){
      isAuthenticated = true;
    }

     console.log(isAuthenticated);

    return (
        isAuthenticated ? 
        <Outlet /> : <Navigate to="/login" />
    )
}
export default ProtectedRoute