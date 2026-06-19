import { useEffect, useState } from "react";
import { datosUser } from '/src/httpRequests';

export function useDatosUsuario(){
    const [usuario, setUsuario] = useState(null);
    const [errorUser, setErrorUser] = useState("");

    useEffect(()=>{
        cargarUsuario();
    }, []);

    const cargarUsuario = async () => {
        try{
            const resultadoUsuario = await datosUser();
            if(resultadoUsuario.exito){
            setUsuario(resultadoUsuario.usuario);
            }
            else{
            setErrorUser(resultadoUsuario.mensaje);
            }
        }
        catch(error){
            setErrorUser("No se pudieron cargar los datos del usuario");
        }
    };

    return { usuario, errorUser };
}