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
            const pedidoList = resultado.pedidos;
            pedidoList.map((item) => {
                const arrayContenido = item.contenido.split(',');
                item.contenido = arrayContenido;
            })

            setPedidos(pedidoList);
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