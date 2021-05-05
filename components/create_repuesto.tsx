import { useState, useEffect, useContext } from 'react'
import { Repuesto, Producto } from '../interfaces/interfaces'
import * as repServ from './controllers/repuestos.controllers'
import GlobalAppContext from '../context/app/app_state'

type input = any

export const CreateRepuesto = ({setModal}:any) => {
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
    const [repuesto, setRepuesto] = useState<Repuesto>(initialState)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)

    const changeProduct = async (param: input) => {

        setRepuesto({ ...repuesto, [param.target.name]: param.target.value })
    }

    const changeImage = async (param: input) => {
        
        const {imagenes} = repuesto
            let img = param.target.name
            /* 
            let base64: string | any = await repServ.toBase64(param.target.files[0]).catch(err => {
                return err
            }) 
            
            setRepuesto({ ...repuesto, imagenes:{...imagenes, [img]:base64 }})
            */
            setRepuesto({ ...repuesto, imagenes:{...imagenes, [img]:param.target.value }})
            /* if(img==="imagen1"){
                setPreviewImage(base64)
            } */
            if(img==="imagen1"){
                setPreviewImage(param.target.value)
            }
            
    }

    const create = async () => {
        
        if (repuesto.nombre === '' || !repuesto.imagenes || repuesto.modelo === '' || repuesto.precio === 0 || repuesto.producto === '') return alert('Rellene todos los campos')
        
        try{
            await repServ.createRepuesto(repuesto)
            setModal(false)
        }catch(err){
            console.log(err)
            alert('Hubo un error')
            setModal(false)
        }
        
    }


    useEffect(() => {
        getProductos()
    }, [])

    return (
        <>
            <div className="component_new_item" >

                <div>
                    <h3>Nuevo repuesto</h3>
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

                        <div className="form" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10}}>
                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen1" type="url" onChange={changeImage} value={repuesto.imagenes?repuesto.imagenes.imagen1:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes?repuesto.imagenes.imagen1:'/logo.png'} alt={repuesto.producto} />
                            </div>

                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen2" type="url" onChange={changeImage} value={repuesto.imagenes?repuesto.imagenes.imagen2:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes?repuesto.imagenes.imagen2:'/logo.png'} alt={repuesto.producto} />
                            </div>

                            <div style={{position:'relative',textAlign:'center'}} >
                                <input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px",color:'black' }} className="inputImage" name="imagen3" type="url" onChange={changeImage} value={repuesto.imagenes?repuesto.imagenes.imagen3:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes?repuesto.imagenes.imagen3:'/logo.png'} alt={repuesto.producto} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    
                    <form className="form" >
                        <div>
                            <label>Nombre:</label>
                            <input name="nombre" onChange={changeProduct} value={repuesto.nombre} />
                        </div>

                        <div>
                            <label>Color:</label>
                            <input name="color" type="text" onChange={changeProduct} value={repuesto.color} />
                        </div>

                        <div>
                            <label>Modelo:</label>
                            <input name="modelo" type="text" onChange={changeProduct} value={repuesto.modelo} />
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
                            <input name="precio" type="number" onChange={changeProduct} value={repuesto.precio} />
                        </div>

                        <div style={{margin:'10px 0'}}>
                            <label>meta descripcion:</label>
                            <textarea name="description" defaultValue={repuesto.description} onChange={changeProduct} >
                                
                            </textarea>
                            
                        </div>

                        <div style={{margin:'10px 0'}}>
                            <label>meta keywords:</label>
                            <input type="text" name="keywords" defaultValue={repuesto.keywords} onChange={changeProduct} />
                            
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