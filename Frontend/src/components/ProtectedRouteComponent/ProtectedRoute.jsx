import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const isUser = lazy(() => import('/src/httpRequests'));

const ProtectedRoute = () => {
    let isAuthenticated = isUser;

    return (
        isAuthenticated ? 
        <Outlet /> : <Navigate to="/login" />
    )
}
export default ProtectedRoute