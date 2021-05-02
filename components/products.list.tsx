import { Producto } from "../interfaces/interfaces"
import Link from 'next/link'

type Props={
    productos:Producto[]
}
const ProductsList = ({productos}:Props)=>{
    return <ul>
        {
            productos.length > 0 ?productos.map((producto:Producto)=>{
                return (
                    <Link key={producto._id} href={`/${producto.seccion}/${producto.url}`} ><li style={{color:'white',cursor:'pointer',padding:'5px 0',borderBottom:'1px solid var(--font-color)'}}>{producto.nombre}</li></Link>
                )
            }):null 
        }
    </ul>
}

export default ProductsList