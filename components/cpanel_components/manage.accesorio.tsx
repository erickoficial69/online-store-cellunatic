import { useState, useEffect, useContext } from 'react'
import { Accesorio, Producto } from '../../interfaces/interfaces'
import * as accesorioServ from '../controllers/accesorios.controllers'
import { useRouter } from 'next/router'
import GlobalAppContext from '../../context/app/app_state'

interface Props {
    accesorio: Accesorio
}
type input = any

export const ManageAccesorio = ({ accesorio }: Props) => {
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
    const [tmpAccesorio, setTmpAccesorio] = useState<Accesorio>(accesorio?accesorio:initialState)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)

    const changeProduct = async (param: input) => {
        
        setTmpAccesorio({ ...tmpAccesorio, [param.target.name]: param.target.value })
    }

    const changeImage = async (param: input) => {
        
        const {imagenes} = tmpAccesorio
            let img = param.target.name
            /* 
            let base64: string | any = await accesorioServ.toBase64(param.target.files[0]).catch(err => {
                return err
            }) 
            
            setTmpAccesorio({ ...accesorio, imagenes:{...imagenes, [img]:base64 }})
            */
            setTmpAccesorio({ ...tmpAccesorio, imagenes:{...imagenes, [img]:param.target.value }})
            /* if(img==="imagen1"){
                setPreviewImage(base64)
            } */
            if(img==="imagen1"){
                setPreviewImage(param.target.value)
            }
            
    }

    const update = async () => {
        
        if (tmpAccesorio.nombre === '' || !tmpAccesorio.imagenes || tmpAccesorio.modelo === '' || tmpAccesorio.precio === 0 || tmpAccesorio.producto === '') return alert('Rellene todos los campos')
        const res = await accesorioServ.updateAccesorio(tmpAccesorio)
        setTmpAccesorio(res)
        back()
    }

    const drop = async () => {
        
        const res = await accesorioServ.deleteAccesorio(tmpAccesorio)
        setTmpAccesorio(res)
        back()
    }
    
    useEffect(() => {
        getProductos()
        setPreviewImage(tmpAccesorio.imagenes.imagen1)
    }, [])

    return (
        <article className="box_detail_item">
            <section>
                <div className="container_img_item" >
                    <img loading="lazy" src={previewImage} alt={tmpAccesorio.nombre} />
                </div>
                <div className="container_inputs_item" >
                    <div >
                        <input name="imagen1" type="url" onChange={changeImage} value={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen1:'/logo.png'} />
                        <img onClick={()=>setPreviewImage(tmpAccesorio.imagenes.imagen1)} src={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen1:'/logo.png'} alt={tmpAccesorio.producto} />
                    </div>

                    <div >
                        <input name="imagen2" type="url" onChange={changeImage} value={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen2:'/logo.png'} />
                        <img onClick={()=>setPreviewImage(tmpAccesorio.imagenes.imagen2)} src={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen2:'/logo.png'} alt={tmpAccesorio.producto} />
                    </div>

                    <div >
                        <input name="imagen3" type="url" onChange={changeImage} value={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen3:'/logo.png'} />
                        <img onClick={()=>setPreviewImage(tmpAccesorio.imagenes.imagen3)} src={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen3:'/logo.png'} alt={tmpAccesorio.producto} />
                    </div>
                </div>
            </section>
            <section>
               <form className="container_details_item" >
                    <div>
                        <label>Nombre:</label>
                        <input name="nombre" onChange={changeProduct} value={tmpAccesorio.nombre} />
                    </div>

                    <div>
                        <label>Color:</label>
                        <input name="color" type="text" onChange={changeProduct} value={tmpAccesorio.color} />
                    </div>

                    <div>
                        <label>Modelo:</label>
                        <input name="modelo" type="text" onChange={changeProduct} value={tmpAccesorio.modelo} />
                    </div>

                    <div>
                        <label>Producto:</label>
                        <select name="producto" defaultValue={tmpAccesorio.producto} onChange={changeProduct}>
                            
                            {
                                productos.data.map((producto: Producto) => {
                                    return (
                                        <option key={producto._id} value={producto.url} >
                                            {producto.nombre}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label>Estado:</label>
                        <select name="estado" defaultValue={tmpAccesorio.estado?1:0} onChange={changeProduct}>
                            
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
                        <input name="precio" type="number" onChange={changeProduct} value={tmpAccesorio.precio} />
                    </div>
                    <div>
                        <label>meta descripcion:</label>
                        <textarea name="description" defaultValue={tmpAccesorio.description} onChange={changeProduct}>

                        </textarea>
                        
                    </div>
                    <div>
                        <label>meta keywords:</label>
                        <input type="text" name="keywords" defaultValue={tmpAccesorio.keywords} onChange={changeProduct} />
                        
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