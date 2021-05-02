import { ChangeEvent,  useContext, useEffect, useState } from "react"
import GlobalAppContext from "../context/app/app_state"

type SearchParam=ChangeEvent<HTMLInputElement>

export const SearchBar = ()=>{
    const [path,setPath] = useState('/')

    const {getAccesorios,getRepuestos}:any = useContext(GlobalAppContext)

    useEffect(()=>{
        setPath(document.location.pathname)
    })
    
    return <form> {path == '/accesorios'?(
    <input onChange={(e:SearchParam)=>getAccesorios(e.target.value,12)} type="search" name="search_items_store" className="search_items_store" /> 
    ): path == '/repuestos' ?(
        <input onChange={(e:SearchParam)=>getRepuestos(e.target.value,12)} type="search" name="search_items_store" className="search_items_store" /> 
    ): path == '/telefonos' ?(
        <input onChange={(e:SearchParam)=>getAccesorios(e.target.value,12)} type="search" name="search_items_store" className="search_items_store" /> 
    ):null}
    </form>
}