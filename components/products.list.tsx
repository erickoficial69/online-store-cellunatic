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
    return <ul>
        {
            productos.length > 0 ?productos.map((producto:Producto)=>{
                if(producto.seccion == seccion){
                    return (
                        <li onClick={()=>loaderCTRL(`/${producto.seccion}/${producto.url}`)} key={producto._id} ><Link href={`/${producto.seccion}/${producto.url}`} ><a>{producto.nombre}</a></Link></li>
                    )
                }
                if(seccion == "*"){
                    return (
                        <li onClick={()=>loaderCTRL(`/${producto.seccion}/${producto.url}`)}  key={producto._id} ><Link href={`/${producto.seccion}/${producto.url}`} ><a>{producto.nombre}</a></Link></li>
                    )
                }
            }):null 
        }
    </ul>
}

export default ProductsList