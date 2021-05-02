import { AppData } from "../../interfaces/interfaces"

function appReducer(state:AppData,action:any){
    const {payload,type} = action

    switch (type) {
        case 'get_app_data':
            return{
                ...state,
                appData:payload
            }
        case 'update_app_data':
            return{
                ...state,
                appData:payload
            }
        case 'get_tasa_cambio':
            return{
                ...state,
                tasaCambio:payload
            }
        case 'update_tasa_cambio':
            return{
                ...state,
                tasaCambio:payload
            }
        case 'get_accesorios':
            return{
                ...state,
                store:{...state.store,accesorios:payload}
            }
        case 'get_productos':
            return{
                ...state,
                store:{...state.store,productos:payload}
            }
        case 'get_repuestos':
            return{
                ...state,
                store:{...state.store,repuestos:payload}
            }
        default:
            return state;
    }
}
export default appReducer