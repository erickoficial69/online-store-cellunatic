import { useContext, useState } from "react"
import GlobalAppContext from "../../context/app/app_state"

type Props={
    setModal:(param:string | boolean)=>void
}

export const Manage_Tasa_Cambio = ({setModal}:Props)=>{
    const [tmpTasa,setTmpTasa] = useState<any>(0)
    const {updateTasa,getTasaCambio,tasaCambio}:any = useContext(GlobalAppContext)

    const updateTasaCambio = async()=>{
        try{
            updateTasa(tmpTasa)
            getTasaCambio()
        }catch(err){
            console.log(err)
            alert('algo salió mal')
        }
        
    }
    return (
        <div className="component_new_item" >
            <div>
                <div className="form" >
                    <h2>Actualizar Tasa</h2>
                    <div>
                        <label>{tasaCambio?tasaCambio.monto:null} bs</label>
                        <input type="number" onChange={(e:any)=>{
                                setTmpTasa({...tasaCambio,monto:e.target.value})
                            }} />
                    </div>

                    <div>
                        <button onClick={updateTasaCambio}>Actializar</button>
                        <button onClick={() => setModal(false)} >cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}