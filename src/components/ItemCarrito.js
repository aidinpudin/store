import React, {useContext} from 'react'
import "../assets/css/ItemCarrito.css"
import iconoSumar from "../assets/statics/sumar.png"
import iconoRestar from "../assets/statics/restar.png"
import Borrar from "../assets/statics/borrar.png";
import Contexto from '../context/Contexto'


export default function ItemCarrito(props){
    const { nombre, precio, img, id, cant} = props;
    console.log(props, "como vienen al item carrito")
    const {eliminarCarrito,sumarCarrito} = useContext(Contexto)
    const handleBorrar = () => {
        props.eliminarCarrito(id);
    }
    return( 
        <>
        <div className="carrito-item">
            <img
                src={img}
                alt=""
                className="carrito-item-img"
            />
            <div className="carrito-txt">
                <h1 className="carrito-item-titulo">{nombre}</h1>
                <h3 className="carrito-item-precio">AR${precio}</h3>
            </div>
            <div className='carritio-botones'>
            <img src={iconoRestar} alt="" className="carrito-item-sumar" onClick={()=>sumarCarrito(id,-1)} />
            <h2 className="carrito-item-precio">{cant}</h2>
            <img src={iconoSumar} alt="" className="carrito-item-sumar" onClick={()=>sumarCarrito(id,1)} />
            <img src={Borrar} alt="" className="carrito-item-borrar" onClick={()=>eliminarCarrito(id)}  />
            </div>
            </div>
        </>
    )
}