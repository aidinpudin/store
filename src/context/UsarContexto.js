import { useReducer } from "react"
import axios from "axios";
import Contexto from "./Contexto";
import Reducer from "./Reducer"

export default function UsarContexto(props) {
    const { children } = props
    const estadoInicial = {
        productos:[],
        carrito:[],
    }
    const [state, dispatch] = useReducer(Reducer, estadoInicial)
    const listameProductos = async ()=>{
        const res = await axios.get(
            "https://devrockstore-default-rtdb.firebaseio.com/productos.json"
            )
            dispatch({type: "LISTAME_PRODUCTOS", payload: res.data})
            console.log(res.data, "desde UsarContexto()")
    }
    const agregarCarrito = (id) => {
        console.log('en agregarCarrito',id)
        let index = state.carrito.findIndex( item => item.id===id)
        if (index >= 0) {      
            state.carrito[index].cant++                        
            dispatch({type: "SETEAR_CARRITO", payload: state.carrito})
        }
        else {
            dispatch({type: "AGREGAR_CARRITO", payload: id})      
        }    
    }

    const sumarCarrito = (id,numero) => {
        console.log('en sumarCarrito',id, numero)
        let index = state.carrito.findIndex( item => item.id===id)
        if (index >= 0) {      
            state.carrito[index].cant+=numero
            if (state.carrito[index].cant===0)
                dispatch({type: "ELIMINAR_CARRITO", payload: id})
            else    
                dispatch({type: "SETEAR_CARRITO", payload: state.carrito})
        }
    }

    const eliminarCarrito = (id) => {
        console.log('eliminar carrito',id)
        dispatch({type: "ELIMINAR_CARRITO", payload: id})
    }
    
    const guardarCompra = (compra) => {
        // seteo la compra en la db
        //push(refCompras, compra)

        // vacio el carrito
        dispatch({type: "SETEAR_CARRITO", payload: []})
    }
    
    return (
        <Contexto.Provider value={{
            productos: state.productos,
            carrito: state.carrito,
            listameProductos,
            agregarCarrito,
            eliminarCarrito,
            sumarCarrito,
            guardarCompra,
        }}
        >
            {children}
            </Contexto.Provider>
    )
}