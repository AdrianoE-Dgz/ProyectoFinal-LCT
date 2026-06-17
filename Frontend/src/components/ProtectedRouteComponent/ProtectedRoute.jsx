import { useNavigate, Outlet } from 'react-router-dom'
import { isUser } from '/src/httpRequests'

const ProtectedRoute = () => {
    const navigate = useNavigate();

    const checkUser = async () => {
        const response = await isUser();

        if(!response){
            navigate('/login');
        }
        return;
    }

    checkUser();

    return (<Outlet />);
}
export default ProtectedRoute