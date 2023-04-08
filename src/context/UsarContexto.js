import { useReducer } from "react"
import Contexto from "./Contexto";
import Reducer from "./Reducer"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref, onValue, push} from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcIPb2oB8uaKz1Ac8RTYK_l2pihkVtOUA",
    authDomain: "aidin-pudin.firebaseapp.com",
    projectId: "aidin-pudin",
    storageBucket: "aidin-pudin.appspot.com",
    messagingSenderId: "256465140496",
    appId: "1:256465140496:web:c3f1d5327731edcd08c395"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase()
const refProductos = ref(db,'productos/')
const refCompras = ref(db,'compras')

export default function UsarContexto(props) {
    const { children } = props
    const estadoInicial = {
        productos:[],
        carrito:[],
    }

    const [state, dispatch] = useReducer(Reducer, estadoInicial)

    const listameProductos = async ()=>{
            onValue(refProductos, (snap)=>{
                let data = snap.val()
                console.log(data, 'desde firebase')
                dispatch({type: "LISTAME_PRODUCTOS", payload: data})
            })
           // console.log(res.data, "desde UsarContexto()")
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