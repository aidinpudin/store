import {React, useContext} from 'react'
import "../assets/css/Producto.css"
import { useLocation } from "react-router-dom";
import Contexto from '../context/Contexto'

export default function Producto(){
    const location = useLocation()
    console.log('location', location.state)
    const {id,img,nombre,precio,medidas,descripcion} = location.state
    const {agregarCarrito} = useContext(Contexto)
    
    return( 
        <>
        <div className="detalle">
            <img
            src={img}
            alt=""
            className="detalle-img"
            />
            <h1 className="home-item-titulo">{nombre}</h1>
            <p className="home-item-medidas">Medidas: {medidas}</p>
            <div className="home-item-actions">
            <h3 className="home-item-precio">AR$ {precio}</h3>&nbsp;
            <button className="home-item-comprar" onClick={()=>agregarCarrito(id)}>+</button>
            </div>
            <p>{descripcion} </p>
        </div>
        </>
    )
    }