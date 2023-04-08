//TYPES

const LISTAME_PRODUCTOS  = "LISTAME_PRODUCTOS"
const AGREGAR_CARRITO = "AGREGAR_CARRITO"
const ELIMINAR_CARRITO = "ELIMINAR_CARRITO"
const SETEAR_CARRITO = "SETEAR_CARRITO"

export default function Reducer (state, action){
    const {payload, type} = action;
    switch (type){
        case LISTAME_PRODUCTOS:
            console.log(payload);
            return {...state, productos: payload};
            case AGREGAR_CARRITO:
                return {
                    ...state, 
                    carrito: state.carrito.concat(state.productos.filter((item) => item.id===payload).map(i => {
                        i.cant = 1
                        return i
                    }))
                }
            case ELIMINAR_CARRITO: 
                return {
                    ...state, 
                    carrito: state.carrito.filter((item) => item.id!==payload)
                }
            case SETEAR_CARRITO:
                return {
                    ...state, 
                    carrito: [...payload]
                }
            default: 
            break;    
            
    }
}