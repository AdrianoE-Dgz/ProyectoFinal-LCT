import { useEffect, useState } from "react";
import { datosProductos } from '/src/httpRequests';

import BunTopImage from '/src/assets/images/Bun-Top.svg'
import BunBottomImage from '/src/assets/images/Bun-Bottom.svg'
import BBQImage from '/src/assets/images/BBQ.svg'
import CheeseImage from '/src/assets/images/Cheese.svg'
import ChickenImage from '/src/assets/images/Chicken.svg'
import KetchupImage from '/src/assets/images/Ketchup.svg'
import LettuceImage from '/src/assets/images/Lettuce.svg'
import MayoImage from '/src/assets/images/Mayo.svg'
import MustardImage from '/src/assets/images/Mustard.svg'
import OnionImage from '/src/assets/images/Onion.svg'
import Pattie1Image from '/src/assets/images/Pattie1.svg'
import Pattie2Image from '/src/assets/images/Pattie2.svg'
import Pattie3Image from '/src/assets/images/Pattie3.svg'
import PickleImage from '/src/assets/images/Pickle.svg'
import TomatoImage from '/src/assets/images/Tomato.svg'

export function useDatosProductos(){
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState("");
    const imagenes = {
        "Bun-Top.svg": BunTopImage,
        "Bun-Bottom.svg": BunBottomImage,
        "BBQ.svg": BBQImage,
        "Cheese.svg": CheeseImage,
        "Chicken.svg": ChickenImage,
        "Ketchup.svg": KetchupImage,
        "Lettuce.svg": LettuceImage,
        "Mayo.svg": MayoImage,
        "Mustard.svg": MustardImage,
        "Onion.svg": OnionImage,
        "Pattie1.svg": Pattie1Image,
        "Pattie2.svg": Pattie2Image,
        "Pattie3.svg": Pattie3Image,
        "Pickle.svg": PickleImage,
        "Tomato.svg": TomatoImage
    }

    useEffect(()=>{
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try{
            const resultado = await datosProductos();
            if(resultado.exito){
                const productosConImagen = resultado.productos.map(
                    producto => ({...producto, imagen: imagenes[producto.imagen]})
                );
                setProductos(productosConImagen);
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