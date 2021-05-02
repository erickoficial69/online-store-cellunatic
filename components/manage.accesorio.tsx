import { useState, useEffect, useContext } from 'react'
import { Accesorio, Producto } from '../interfaces/interfaces'
import * as accesorioServ from './controllers/accesorios.controllers'
import { useRouter } from 'next/router'
import GlobalAppContext from '../context/app/app_state'

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
    const {loaderCTRL,productos,getProductos}:any = useContext(GlobalAppContext)
    const { back, push } = useRouter()
    const [tmpAccesorio, setTmpAccesorio] = useState<Accesorio>(accesorio?accesorio:initialState)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)

    const changeProduct = async (param: input) => {

        setTmpAccesorio({ ...tmpAccesorio, [param.target.name]: param.target.value })
    }

    const changeImage = async (param: input) => {
        loaderCTRL('load')
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
            loaderCTRL(false)
    }

    const update = async () => {
        loaderCTRL('load')
        if (tmpAccesorio.nombre === '' || !tmpAccesorio.imagenes || tmpAccesorio.modelo === '' || tmpAccesorio.precio === 0 || tmpAccesorio.producto === '') return alert('Rellene todos los campos')
        const res = await accesorioServ.updateAccesorio(tmpAccesorio)
        setTmpAccesorio(res)
        back()
    }

    const drop = async () => {
        loaderCTRL('load')
        const res = await accesorioServ.deleteAccesorio(tmpAccesorio)
        setTmpAccesorio(res)
        back()
    }

    const clean = () => {
        loaderCTRL('load')
        setTmpAccesorio(initialState)
        loaderCTRL(false)
    }

    const create = async () => {
        
        if (tmpAccesorio.nombre === '' || !tmpAccesorio.imagenes || tmpAccesorio.modelo === '' || tmpAccesorio.precio === 0 || tmpAccesorio.producto === '') return alert('Rellene todos los campos')
        loaderCTRL('load')
        try{
            await accesorioServ.createAccesorio(tmpAccesorio)
            push('/cpanel')
        }catch(err){
            console.log(err)
            alert('Hubo un error')
        }
        loaderCTRL(false)
    }

    useEffect(() => {
        getProductos()
        setPreviewImage(tmpAccesorio.imagenes.imagen1)
        loaderCTRL(document.location.pathname)
    }, [accesorio])

    return (
        <>
            <div>

                <div>
                    <div style={{
                        borderRadius: '5px',
                        boxShadow: '0px 0px 1px black',
                        height: '300px',
                        background: 'white',
                        overflow: 'hidden',
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }} >

                        <img style={{height: "90%",width: "90%",objectFit: "contain",position: 'relative'}}
                            src={previewImage}/>

                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10}}>
                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen1" type="url" onChange={changeImage} value={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen1:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(tmpAccesorio.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen1:'/logo.png'} alt={tmpAccesorio.producto} />
                            </div>

                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen2" type="url" onChange={changeImage} value={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen2:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(tmpAccesorio.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen2:'/logo.png'} alt={tmpAccesorio.producto} />
                            </div>

                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen3" type="url" onChange={changeImage} value={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen3:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(tmpAccesorio.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={tmpAccesorio.imagenes?tmpAccesorio.imagenes.imagen3:'/logo.png'} alt={tmpAccesorio.producto} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ul >
                        <form>
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
                                <label>Producto:{tmpAccesorio.producto}</label>
                                <select style={{ padding: '5px', minWidth: '200px', background: 'transparent', borderBottom: '1px solid orange' }} name="producto" onChange={changeProduct}>
                                    
                                    {
                                        productos.data.map((producto: Producto) => {
                                            return (
                                                <option style={{cursor:'pointer',padding:'4px'}} key={producto._id} value={producto.nombre} >
                                                    {producto.nombre}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Estado:</label>
                                <select style={{ padding: '5px', minWidth: '200px', background: 'transparent', borderBottom: '1px solid orange' }} name="estado" onChange={changeProduct}>
                                    
                                    <option style={{cursor:'pointer',padding:'4px'}} value={1} >
                                        disponible
                                    </option>
                                    <option style={{cursor:'pointer',padding:'4px'}} value={0} >
                                        agotado
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label>Precio:</label>
                                <input name="precio" type="number" onChange={changeProduct} value={tmpAccesorio.precio} />
                            </div>
                            <div style={{margin:'10px 0'}}>
                                <label>meta descripcion:</label>
                                <input type="text" name="description" defaultValue={tmpAccesorio.description} onChange={changeProduct} />
                                
                            </div>

                            <div style={{margin:'10px 0'}}>
                                <label>meta keywords:</label>
                                <input type="text" name="keywords" defaultValue={tmpAccesorio.keywords} onChange={changeProduct} />
                                
                            </div>
                        </form>

                        <li>
                            {
                                accesorio._id?(
                                    <>
                                        <button onClick={update}  style={{ backgroundColor: 'purple', width: '120px', color: 'white' }} >Actualizar</button>
                                        <>
                                            <button onClick={drop}  style={{ backgroundColor: 'darkorange', width: '120px' }} >Eliminar</button>
                                        </>
                                    </>
                                ):(
                                    <>
                                        <button onClick={create}  style={{ backgroundColor: 'green', width: '120px', color: 'white' }} >Agregar</button>
                                        <>
                                            <button onClick={()=>{
                                                back()
                                                }}  style={{ backgroundColor: 'lightgreen', width: '120px' }} >Regresar</button>
                                        </>
                                    </>
                                )
                            }
                        </li>
                        <li>
                            {
                                accesorio._id?(
                                    
                                            <button onClick={()=>{
                                                loaderCTRL('load')
                                                clean()
                                                push('/detalleaccesorio/new')
                                                loaderCTRL(false)
                                                }}  style={{ backgroundColor: 'lightgreen', width: '120px',margin:'10px 0'}} >Nuevo</button>
                                    
                                ):null
                            }
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}