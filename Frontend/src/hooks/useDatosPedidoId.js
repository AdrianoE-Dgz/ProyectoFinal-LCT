import { useEffect, useState } from "react";
import { datosPedidosPorId } from '/src/httpRequests';

export function useDatosPedidoId(id){
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(null);

    useEffect(()=>{
        if(!id){
            setPedido(null);
            setError("");
            return;
        }
        cargarPedido(id);
    }, [id]);

    const cargarPedido = async (id) => {
        setLoading(true);
        setError("");
        setPedido(null);
        try{
            const resultado = await datosPedidosPorId(id);
            if(resultado.exito){
            const pedidoList = resultado.pedido;
            const arrayContenido = pedidoList.contenido.split(',');
            pedidoList.contenido = arrayContenido;
            setPedido(pedidoList);
            }
            else{
            setError(resultado.mensaje);
            }
        }catch(error){
            setError("No se pudieron cargar los pedido");
        }finally{
            setLoading(false);
        }
    };

    return { pedido, error, loading };
}