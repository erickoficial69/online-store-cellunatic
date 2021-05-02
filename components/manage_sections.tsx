import { useContext } from 'react'
import GlobalAppContext from '../context/app/app_state'
import { Seccion } from '../interfaces/interfaces'
import * as prodServ from '../components/controllers/secciones.controllers'

type Props={
    seccion:Seccion
    setTmpSecc:(param:Seccion)=>void
    setModal:(param:string | boolean)=>void
}

export const ManageSection = ({seccion,setModal,setTmpSecc}:Props) => {
    const {loaderCTRL}:any = useContext(GlobalAppContext)
    
    const addProduct = async () => {
        if(seccion.title === '') return alert('rellene todos los campos')
        try{
            loaderCTRL('load')
            setModal(false)
            loaderCTRL(false)
        }catch(err){
            alert('hubo un error con el servidor')
            loaderCTRL(false)
            return console.log(err)
        }
    }
    const updateProduct = async () => {
        if(seccion.title === '' ) return alert('rellene todos los campos')
        try{
            loaderCTRL('load')
            await prodServ.updateSeccion(seccion)
            setModal(false)
            loaderCTRL(false)
        }catch(err){
            alert('hubo un error con el servidor')
            loaderCTRL(false)
            return console.log(err)
        }
    }

    const deleteProduct = async(id?:string)=>{
        if(id!==''){
            loaderCTRL('load')
            await prodServ.deleteSeccion(id?id:'')
            setModal(false)
            loaderCTRL(false)
        }
    }

    return (
        <div className="component_new_item" >
            <div className="form" >
                <div style={{margin:'10px 0'}}>
                    <label>Nombre</label>
                    <input type="text" name="nombre" defaultValue={seccion.title} onChange={(e)=>setTmpSecc({...seccion,title:e.target.value})} />
                </div>

                <div style={{margin:'10px 0'}}>
                    <label>meta descripcion:</label>
                    <input type="text" name="description" defaultValue={seccion.description} onChange={(e)=>setTmpSecc({...seccion,description:e.target.value})} />
                    
                </div>
                <div style={{margin:'10px 0'}}>
                    <label>meta keywords:</label>
                    <input type="text" name="keywords" defaultValue={seccion.keywords} onChange={(e)=>setTmpSecc({...seccion,keywords:e.target.value})} />
                    
                </div>
                <div style={{margin:'10px 0'}}>
                    <button style={{margin:'5px'}} onClick={updateProduct} >actualizar</button>
                    <button onClick={()=>deleteProduct(seccion._id)}>Eliminar</button>
                    
                    <button onClick={addProduct}>Añadir</button>
                    <button onClick={()=>setModal(false)}>cerrar</button>
                </div>
            </div>
        </div>
    )
}