import { useEffect, useState } from "react";
import { datosPedidosUser } from '/src/httpRequests';

export function useDatosPedidoUser(){
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=>{
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try{
            const resultado = await datosPedidosUser();
            if(resultado.exito){
            setPedidos(resultado.pedidos);
            }
            else{
            setError(resultado.mensaje);
            }
        }catch(error){
            setError("No se pudieron cargar los pedidos");
        }
    };

    return { pedidos, error };
}