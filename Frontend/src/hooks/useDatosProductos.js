import { useEffect, useState } from "react";
import { datosProductos } from '/src/httpRequests';

export function useDatosProductos(){
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=>{
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try{
            const resultado = await datosProductos();
            if(resultado.exito){
            setProductos(resultado.productos);
            }
            else{
            setError(resultado.mensaje);
            }
        }catch(error){
            setError("No se pudieron cargar los pedidos");
        }
    };

    return { productos, error };
}