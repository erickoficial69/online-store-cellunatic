import { Producto, Seccion } from "../../interfaces/interfaces";

type Product_Params={
    productos:Producto[]
    setModal:(param:string | boolean)=>void
    setTmpProd:(param:Producto)=>void
}
type Section_Params={
    secciones:Seccion[]
    setModal:(param:string | boolean)=>void
    setTmpSecc:(param:Seccion)=>void
}

export const List_products_admin = ({productos,setModal,setTmpProd}:Product_Params)=>{
    return (
        <ul className="admin_list_box" >
            <h3>Productos</h3>
                {
                    // Lista de productos
                    productos.map((producto:Producto)=>{
                        return(
                            <li key={producto.nombre} onClick={()=>{setModal('manage_productos');setTmpProd(producto)}} >{producto.nombre}</li>
                        )
                    })
                }
        </ul>
    )
}

export const List_Sections_Admin = ({secciones,setModal,setTmpSecc}:Section_Params)=>{
    return (
        <ul className="admin_list_box" >
            <h3>Secciones</h3>
                {
                    // Lista de secciones
                    secciones.map((seccion:Seccion)=>{
                        return(
                            <li key={seccion.title} onClick={()=>{setModal('manage_secciones');setTmpSecc(seccion)}} >{seccion.title}</li>
                        )
                    })
                }
        </ul>
    )
}