import { useContext, useEffect, useState } from 'react'
import GlobalAppContext from '../../context/app/app_state'
import { Producto, Seccion } from '../../interfaces/interfaces'
import * as prodServ from '../controllers/productos.controllers'
import * as seccServ from '../controllers/secciones.controllers'

type Props={
    producto:Producto
    setTmpProd:(param:Producto)=>void
    setModal:(param:string | boolean)=>void
}

export const ManageProduct = ({producto,setModal,setTmpProd}:Props) => {
    const [secciones,setSecciones] = useState<Seccion[]>([{title:''}])
    const {getProductos}:any = useContext(GlobalAppContext)
    
    const addProduct = async () => {
        if(producto.nombre === '' || producto.seccion === '') return alert('rellene todos los campos')
        
        try{
            await prodServ.createProducto(producto)
            await getProductos()
            
        }catch(err){
            alert('Hubo un error con el servidor')
            return console.log(err)
        }
        setModal(false)
    }
    const updateProduct = async () => {
        if(producto.nombre === '' || producto.seccion === '') return alert('rellene todos los campos')
        try{
            await prodServ.updateProducto(producto)
            await getProductos()
        }catch(err){
            alert('Hubo un error con el servidor')
            return console.log(err)
        }
        setModal(false)
    }
    const deleteProduct = async(id?:string)=>{
        if(id!==''){
            try{
                await prodServ.deleteProducto(id?id:'')
                await getProductos()
                
            }catch(err){
                alert('Hubo un error con el servidor')
                return console.log(err)
            }
            setModal(false)
        }
    }
    useEffect(() => {
        (async()=>{
            setSecciones(await seccServ.getSecciones())
        })()
    }, [])

    return (
        <div className="component_new_item" >

                <div>
                    <h3>Producto</h3>
                    <div className="form" >
                        <div>
                            <label>Nombre</label>
                            <input name="nombre" value={producto.nombre} onChange={(e)=>setTmpProd({...producto,nombre:e.target.value})} />
                        </div>

                        <div>
                            <label>Seccion:</label>
                            <select defaultValue={producto.seccion} name="seccion" onChange={(e)=>setTmpProd({...producto,seccion:e.target.value})}>
                            <option value={producto.seccion} >{producto.seccion}</option>
                                {
                                    secciones.map((rs:Seccion)=>{
                                        return <option key={rs.title} value={rs.url} >{rs.title}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div style={{margin:'10px 0'}}>
                            <label>meta descripcion:</label>
                            <textarea name="description" defaultValue={producto.description} onChange={(e)=>setTmpProd({...producto,description:e.target.value})}>

                            </textarea>
                            
                        </div>

                        <div style={{margin:'10px 0'}}>
                            <label>meta keywords:</label>
                            <input type="text" name="keywords" defaultValue={producto.keywords} onChange={(e)=>setTmpProd({...producto,keywords:e.target.value})} />
                            
                        </div>
                    </div>
                </div>

                <div>
                    <div >
                        <button style={{margin:'5px'}} onClick={updateProduct} >actualizar</button>
                        <button onClick={()=>deleteProduct(producto._id)}>Eliminar</button>
                            
                        <button onClick={addProduct}>Añadir</button>
                        <button onClick={()=>{setModal(false); setTmpProd({estado:false,nombre:'',seccion:''})}}>cerrar</button>
                    </div>
                </div>

            </div>
    )
}