import { Seccion } from '../../interfaces/interfaces'
import * as prodServ from '../controllers/secciones.controllers'

type Props={
    seccion:Seccion
    setTmpSecc:(param:Seccion)=>void
    setModal:(param:string | boolean)=>void
    setSecciones:(param:Seccion[])=>void
}

export const ManageSection = ({seccion,setModal,setTmpSecc,setSecciones}:Props) => {
    
    const addProduct = async () => {
        if(seccion.title === '') return alert('rellene todos los campos')
        
        try{
            await prodServ.createSeccion(seccion)
            setSecciones(await prodServ.getSecciones())
        }catch(err){
            alert('hubo un error con el servidor')
            return console.log(err)
        }
        setModal(false)
        
    }
    const updateProduct = async () => {
        if(seccion.title === '' ) return alert('rellene todos los campos')
        
        try{
            await prodServ.updateSeccion(seccion)
            setSecciones(await prodServ.getSecciones())
        }catch(err){
            alert('hubo un error con el servidor')
            return console.log(err)
        }
        setModal(false)
        
    }

    const deleteProduct = async(id?:string)=>{
        if(id!==''){
            
            await prodServ.deleteSeccion(id?id:'')
            setSecciones(await prodServ.getSecciones())
            setModal(false)
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
                    <textarea name="description" defaultValue={seccion.description} onChange={(e)=>setTmpSecc({...seccion,description:e.target.value})} >

                    </textarea>
                    
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