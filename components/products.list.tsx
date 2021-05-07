import { Producto } from "../interfaces/interfaces"
import Link from 'next/link'
import { useContext } from "react"
import GlobalAppContext from "../context/app/app_state"

type Props={
    productos:Producto[]
    seccion:String
}
const ProductsList = ({productos,seccion}:Props)=>{
    const {loaderCTRL}:any = useContext(GlobalAppContext)
    return <ul style={{width:'100%'}} >
        {
            productos.length > 0 ?productos.map((producto:Producto)=>{
                if(producto.seccion == seccion){
                    return (
                        <Link key={producto._id} href={`/${producto.seccion}/${producto.url}`} ><li onClick={()=>loaderCTRL(`/${producto.seccion}/${producto.url}`)} style={{width:'100%',color:'white',cursor:'pointer',padding:'5px 0',borderBottom:'1px solid var(--font-color)',background:'var(--primary-color)'}}>{producto.nombre}</li></Link>
                    )
                }
                if(seccion == "*"){
                    return (
                        <Link key={producto._id} href={`/${producto.seccion}/${producto.url}`} ><li onClick={()=>loaderCTRL(`/${producto.seccion}/${producto.url}`)} style={{width:'100%',color:'white',cursor:'pointer',padding:'5px 0',borderBottom:'1px solid var(--font-color)',background:'var(--primary-color)'}}>{producto.nombre}</li></Link>
                    )
                }
            }):null 
        }
    </ul>
}

export default ProductsList