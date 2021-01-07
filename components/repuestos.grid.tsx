import {Grid, Typography, Button} from '@material-ui/core'
import { Repuesto, User } from '../interfaces/interfaces'
import {useRouter} from 'next/router'
import { deleteRepuesto } from './controllers/repuestos.controllers'

interface Props{
    repuestos:Repuesto[]
    user?:User
    setAlterEvent?:any
}

export const GridRepuestos = ({repuestos,user,setAlterEvent}:Props)=>{
    const {push} = useRouter()

    const getDetalle=(id:string | undefined)=>{
        setAlterEvent(true)
        push(`/detallerepuesto/${id}`)
    }

    const drop = async(param:Repuesto)=>{
        setAlterEvent(true)
        await deleteRepuesto(param)
        setAlterEvent(false)
    }

    return(
            <Grid container spacing={1} style={{padding:'20px 0'}} >

                    {
                        repuestos.length > 0 ? repuestos.map((list:Repuesto,i:number) =>{
                            return(
                            
                                <Grid key={i} item xs={6} sm={3} lg={2} >
                                
                                    <div style={{
                                        borderRadius:'5px',
                                        position:'relative',
                                        boxShadow:'0px 0px 1px white',
                                        width:'230px',
                                        height:'300px',
                                        background:'white',
                                        overflow:'hidden',
                                        cursor:'pointer',
                                        textAlign:'center'
                                        }} >
                                    
                                                <img onClick={()=>getDetalle(list._id)} style={{
                                                    height:"90%",
                                                    width:"90%",
                                                    objectFit:"contain",
                                                    margin:'0 auto',
                                                    position:'relative'}} src={process.env.API+'/'+list.imagenes.imagen1} alt={list.producto} />
                                               
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
                                                    <Typography style={{height:'28px', overflow:'hidden', color:'white',fontWeight:'bold'}} variant="body1" >{list.nombre}</Typography>
                                                    
                                                    <Typography style={{height:'20px', overflow:'hidden', color:'white'}} >{list.precio} $</Typography>
                                                </div>

                                                {
                                                    user?(
                                                        user.rango === "administrador"?(
                                                            <Button size="small" variant="contained" style={{position:'absolute',top:'0',right:'0%',backgroundColor:'darkorange'}} onClick={()=>drop(list)} >Eliminar</Button>
                                                        ):null
                                                    ):null
                                                }
                                    </div>
                                </Grid>
                            
                            )
                        }) : null
                    }
                </Grid>
    )
}