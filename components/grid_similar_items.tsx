import { Accesorio, Repuesto, User } from '../interfaces/interfaces'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as userServ from './controllers/usuarios.controllers'

interface Props{
    items:Repuesto[] | Accesorio[]
}
type Item = Repuesto | Accesorio

const Grid_similars_items = ({items}:Props)=>{
    const [user,setUser] = useState<User>({correo:'',password:''})

    useEffect(()=>{
        setUser(userServ.verifySesion)
    },[])

    return(
            <>

                {
                    items.length > 0 ? items.map((list:Item,i:number) =>{
                        return(
                            <Link key={i} href={`/i/${list.url}/${list.producto}`} >
                                <div className="item">
                                    <img loading="lazy" style={{
                                        height:"90%",
                                        width:"90%",
                                        objectFit:"contain",
                                        margin:'0 auto',
                                        position:'relative'}} src={list.imagenes.imagen1} alt={list.producto} />
                                    
                                    <div style={{
                                        textAlign:'center',
                                        position:'absolute',
                                        bottom:'0',
                                        left:'0%',
                                        right:'0%',
                                        background:'rgba(30,30,30, .8)',
                                        padding:'5px 0',
                                        width:'100%'
                                    }}>
                                        <p style={{height:'22px', overflow:'hidden', color:'white',fontWeight:'bold'}} >{list.nombre}</p>
                                        
                                        <p style={{height:'20px', overflow:'hidden', color:'white'}} >$ {list.precio}</p>
                                    </div>

                                    {
                                        user?(
                                            user.rango === "administrador"?(
                                                <button style={{position:'absolute',top:'0',right:'0%',backgroundColor:'darkorange'}} >Admin</button>
                                            ):null
                                        ):null
                                    }
                                </div>
                            </Link>
                        )
                    }) : null
                }
            </>
    )
}

export default Grid_similars_items