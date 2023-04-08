import React, { useContext } from "react";
import "../assets/css/Carrito.css"
import ItemCarrito from "../components/ItemCarrito";
import Contexto from "../context/Contexto";
import { Link } from 'react-router-dom'

export default function Carrito(){
    const { carrito, guardarCompra } = useContext(Contexto)
    const suma = carrito.reduce((sum,item) => sum+(item.precio*item.cant), 0)
    return( 
        <>
        <div className="carrito">
        <div className="carrito-listadito">
            {carrito.map((item, i)=>(
                <ItemCarrito 
                {...item} 
                key={i} 
                ></ItemCarrito>
            ))}
        </div>
        <div className="carrito-precio">
            Total a pagar <br /><strong>U$D {suma}</strong>
        </div>

        <div className="carrito-boton">
        <Link to="/carrito">
        <button onClick={()=>guardarCompra(carrito)}>Comprar</button>
        </Link>     

        </div>
        </div>
        </>
    )
}
