import { useContext } from "react"
import GlobalAppContext from "../context/app/app_state"


export const SearchBar = ()=>{
   const {buscador}:any= useContext(GlobalAppContext)
    const handledSubmit = async (e:any)=>{
        e.preventDefault()
        buscador.handler(e.target.search_items_store.value,10)
    }
    return <form onSubmit={handledSubmit} > 
         {
             buscador.activo?(
                <input type="search" name="search_items_store" className="search_items_store" />
             ):null
         }
    </form>
}