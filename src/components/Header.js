import React, { useContext, useState, useEffect }  from 'react'
import iconoCarrito from "../assets/statics/carrito.png"
import iconoVolver from "../assets/statics/volver.png"
import { Link } from "react-router-dom";
import Contexto from '../context/Contexto'

export default function Header() {
    const {carrito} = useContext(Contexto)
    const [cant,setCant] = useState(0)

    useEffect(()=> {
        setCant(carrito.reduce((sum,item) => sum+item.cant, 0))
    },[carrito])

    return (
    <>
    <header>
        <Link to="/carrito">
            <img src={iconoCarrito} alt="" className="carritou" />
            { cant > 0 ? (<span className="carrito-number" id='carrito-number'>{cant}</span>):(<></>)}
        </Link>

        <Link to="/">
            <img src={iconoVolver} alt="" className="volver" />
        </Link>
        
        <h1 className="titulo">
            DevRock <br />
            Store
        </h1>
    </header>
    </>
    );
}