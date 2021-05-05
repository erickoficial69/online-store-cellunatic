import { useState, useEffect, useContext } from 'react'
import { Accesorio, Producto } from '../interfaces/interfaces'
import * as accesorioServ from './controllers/accesorios.controllers'
import GlobalAppContext from '../context/app/app_state'

type input = any

export const CreateAccesorio = ({setModal}:any) => {
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
    const [accesorio, setAccesorio] = useState<Accesorio>(initialState)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)

    const changeProduct = async (param: input) => {

        setAccesorio({ ...accesorio, [param.target.name]: param.target.value })
    }

    const changeImage = async (param: input) => {
        loaderCTRL('load')
        const {imagenes} = accesorio
            let img = param.target.name
            /* 
            let base64: string | any = await accesorioServ.toBase64(param.target.files[0]).catch(err => {
                return err
            }) 
            
            setAccesorio({ ...accesorio, imagenes:{...imagenes, [img]:base64 }})
            */
            setAccesorio({ ...accesorio, imagenes:{...imagenes, [img]:param.target.value }})
            /* if(img==="imagen1"){
                setPreviewImage(base64)
            } */
            if(img==="imagen1"){
                setPreviewImage(param.target.value)
            }
            loaderCTRL(false)
    }

    const create = async () => {
        
        if (accesorio.nombre === '' || !accesorio.imagenes || accesorio.modelo === '' || accesorio.precio === 0 || accesorio.producto === '') return alert('Rellene todos los campos')
        loaderCTRL('load')
        console.log(accesorio)
        try{
            await accesorioServ.createAccesorio(accesorio)
            setModal(false)
        }catch(err){
            console.log(err)
            alert('Hubo un error')
            setModal(false)
        }
        loaderCTRL(false)
    }


    useEffect(() => {
        getProductos()
    }, [])

    return (
        <>
            <div className="component_new_item" >

                <div>
                    <h3>Nuevo accesorio</h3>
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

                        <div className="form"  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10}}>
                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen1" type="url" onChange={changeImage} value={accesorio.imagenes?accesorio.imagenes.imagen1:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(accesorio.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={accesorio.imagenes?accesorio.imagenes.imagen1:'/logo.png'} alt={accesorio.producto} />
                            </div>

                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen2" type="url" onChange={changeImage} value={accesorio.imagenes?accesorio.imagenes.imagen2:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(accesorio.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={accesorio.imagenes?accesorio.imagenes.imagen2:'/logo.png'} alt={accesorio.producto} />
                            </div>

                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen3" type="url" onChange={changeImage} value={accesorio.imagenes?accesorio.imagenes.imagen3:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(accesorio.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={accesorio.imagenes?accesorio.imagenes.imagen3:'/logo.png'} alt={accesorio.producto} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    
                    <form className="form" >
                        <div>
                            <label>Nombre:</label>
                            <input name="nombre" onChange={changeProduct} value={accesorio.nombre} />
                        </div>

                        <div>
                            <label>Color:</label>
                            <input name="color" type="text" onChange={changeProduct} value={accesorio.color} />
                        </div>

                        <div>
                            <label>Modelo:</label>
                            <input name="modelo" type="text" onChange={changeProduct} value={accesorio.modelo} />
                        </div>

                        <div>
                            <label>Producto:</label>
                            <select defaultValue="" name="producto" onChange={changeProduct}>
                            <option>Seleccione</option>
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
                            <select defaultValue={1} name="estado" onChange={changeProduct}>
                                
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
                            <input name="precio" type="number" onChange={changeProduct} value={accesorio.precio} />
                        </div>
                        <div style={{margin:'10px 0'}}>
                            <label>meta descripcion:</label>
                            <textarea name="description" defaultValue={accesorio.description} onChange={changeProduct} >

                            </textarea>
                            
                        </div>

                        <div style={{margin:'10px 0'}}>
                            <label>meta keywords:</label>
                            <input type="text" name="keywords" defaultValue={accesorio.keywords} onChange={changeProduct} />
                            
                        </div>
                    </form>

                        <div>
                            <button onClick={create}  style={{ backgroundColor: 'green', width: '120px', color: 'white' }} >Agregar</button>      
                            <button onClick={()=>setModal(false)} >Cerrar</button>                      
                        </div>

                </div>
            </div>
            
        </>
    )
}