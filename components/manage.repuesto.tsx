import { useState, useEffect, useContext } from 'react'
import { Repuesto, Producto } from '../interfaces/interfaces'
import * as itemServ from './controllers/repuestos.controllers'
import { useRouter } from 'next/router'
import GlobalAppContext from '../context/app/app_state'

interface Props {
    item: Repuesto
}
type input = any

export const ManageRepuesto = ({ item }: Props) => {
    const initialState = {
        nombre: '',
        color: '',
        estado: false,
        imagenes: {
            imagen1:'/logo192x192.png',
            imagen2:'/logo192x192.png',
            imagen3:'/logo192x192.png'
        },
        modelo: '',
        precio: 0,
        producto: ''
    }
    const {productos,getProductos}:any = useContext(GlobalAppContext)
    const { back } = useRouter()
    const [tmpItem, setTmpItem] = useState<Repuesto>(item?item:initialState)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)

    const changeProduct = async (param: input) => {

        setTmpItem({ ...tmpItem, [param.target.name]: param.target.value })
    }

    const changeImage = async (param: input) => {
        
        const {imagenes} = tmpItem
            let img = param.target.name
            /* 
            let base64: string | any = await itemServ.toBase64(param.target.files[0]).catch(err => {
                return err
            }) 
            
            setTmpItem({ ...accesorio, imagenes:{...imagenes, [img]:base64 }})
            */
            setTmpItem({ ...tmpItem, imagenes:{...imagenes, [img]:param.target.value }})
            /* if(img==="imagen1"){
                setPreviewImage(base64)
            } */
            if(img==="imagen1"){
                setPreviewImage(param.target.value)
            }
            
    }

    const update = async () => {
        
        if (tmpItem.nombre === '' || !tmpItem.imagenes || tmpItem.modelo === '' || tmpItem.precio === 0 || tmpItem.producto === '') return alert('Rellene todos los campos')
        const res = await itemServ.updateRepuesto(tmpItem)
        setTmpItem(res)
        back()
    }

    const drop = async () => {
        
        const res = await itemServ.deleteRepuesto(tmpItem)
        setTmpItem(res)
        back()
    }
    useEffect(() => {
        getProductos()
        setPreviewImage(tmpItem.imagenes.imagen1)
    }, [])

    return (
            <article className="box_detail_item" >
                <section>
                    <div className="container_img_item">
                        <img src={previewImage} alt={tmpItem.nombre} />
                    </div>

                    <div className="container_inputs_item">
                        <div>
                            <input name="imagen1" type="url" onChange={changeImage} value={tmpItem.imagenes?tmpItem.imagenes.imagen1:'/logo.png'} />
                            <img onClick={()=>setPreviewImage(tmpItem.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={tmpItem.imagenes?tmpItem.imagenes.imagen1:'/logo.png'} alt={tmpItem.producto} />
                        </div>

                        <div>
                            <input name="imagen2" type="url" onChange={changeImage} value={tmpItem.imagenes?tmpItem.imagenes.imagen2:'/logo.png'} />
                            <img onClick={()=>setPreviewImage(tmpItem.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={tmpItem.imagenes?tmpItem.imagenes.imagen2:'/logo.png'} alt={tmpItem.producto} />
                        </div>

                        <div>
                            <input name="imagen3" type="url" onChange={changeImage} value={tmpItem.imagenes?tmpItem.imagenes.imagen3:'/logo.png'} />
                            <img onClick={()=>setPreviewImage(tmpItem.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={tmpItem.imagenes?tmpItem.imagenes.imagen3:'/logo.png'} alt={tmpItem.producto} />
                        </div>
                    </div>
                </section>
                <section> 
                    <form className="container_details_item" >
                        <div>
                            <label>Nombre:</label>
                            <input name="nombre" onChange={changeProduct} value={tmpItem.nombre} />
                        </div>

                        <div>
                            <label>Color:</label>
                            <input name="color" type="text" onChange={changeProduct} value={tmpItem.color} />
                        </div>

                        <div>
                            <label>Modelo:</label>
                            <input name="modelo" type="text" onChange={changeProduct} value={tmpItem.modelo} />
                        </div>

                        <div>
                            <label>Producto:</label>
                            <select name="producto" onChange={changeProduct}>
                                
                                {
                                    productos.data.map((producto: Producto) => {
                                        return (
                                            <option key={producto._id} value={producto.nombre} >
                                                {producto.nombre}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <label>Estado:</label>
                            <select name="estado" onChange={changeProduct}>
                                
                                <option value={1} >
                                    disponible
                                </option>
                                <option value={0} >
                                    agotado
                                </option>
                            </select>
                        </div>

                        <div>
                            <label>Precio:</label>
                            <input name="precio" type="number" onChange={changeProduct} value={tmpItem.precio} />
                        </div>
                        <div style={{margin:'10px 0'}}>
                            <label>meta descripcion:</label>
                            <input type="text" name="description" defaultValue={tmpItem.description} onChange={changeProduct} />
                            
                        </div>

                        <div style={{margin:'10px 0'}}>
                            <label>meta keywords:</label>
                            <input type="text" name="keywords" defaultValue={tmpItem.keywords} onChange={changeProduct} />
                            
                        </div>
                    </form>

                    <nav>
                    
                        <button onClick={update} style={{ backgroundColor: 'purple', width: '120px', color: 'white' }} >Actualizar</button>
                        
                        <button onClick={drop} style={{ backgroundColor: 'darkorange', width: '120px' }} >Eliminar</button>
                        
                        <button onClick={()=>{back()}} style={{ backgroundColor: 'lightgreen', width: '120px' }} >Regresar</button>
                                
                    </nav>
                </section>
            </article>
    )
}