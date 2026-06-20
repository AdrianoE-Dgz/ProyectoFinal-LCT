import { useEffect, useState } from "react";
import { datosAllPedidos } from '/src/httpRequests';

export function useDatosAllPedidos(){
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(null);

    useEffect(()=>{
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        setLoading(true);
        setError("");
        setPedidos(null);
        try{
            const resultado = await datosAllPedidos();
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
        }finally{
            setLoading(false);
        }
    };

    return { pedidos, error, loading };
}