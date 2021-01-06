import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import Template from "../components/App";
import { GridProducts } from "../components/products.grid";
import { Accesorio, Repuesto,Context} from '../interfaces/interfaces'
import { GridRepuestos } from "../components/repuestos.grid";
import {getAccesorios} from '../components/controllers/accesorios.controllers'
import {getRepuestos} from '../components/controllers/repuestos.controllers'
import {useRouter} from 'next/router'


const Index=({context}:any)=>{
    const {setAppLoader}:Context = context
    const [alterEvent,setAlterEvent] = useState<boolean>(false)
    const [accesorios,setAccesorios] = useState<Accesorio[]>([])
    const [repuestos,setRepuestos] = useState<Repuesto[]>([])
    const {push} = useRouter()

    const startComponent=async()=>{

        const {accesories} = await getAccesorios(6)
        const {repuestos} = await getRepuestos(6)

        setRepuestos(repuestos)
        setAccesorios(accesories)
    }
    useEffect(()=>{
        startComponent()
        setAppLoader(false)
    },[alterEvent])

    return(
        <>
            <Head>
                <title>Cellunatic - home</title>
            </Head>

            <div style={{
                position:'relative',
                height:'100vh',
                maxHeight:'720px',
                display:'flex',
                flexFlow:'row wrap',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center',
                margin:'60px 0 5px 0'
                }}>

                <img width="300px" src="/logo192x192.png" alt="Cellunatic logo"/>
                <span >
                <Typography component="h1" style={{textAlign:'center'}} className="coursive" variant="h2" color="textPrimary" >
                        <b>Cellunatic 2017 CG C.A</b>
                    </Typography>
                        <br/>
                    <Typography style={{width:'100%',textAlign:'center'}} variant="h5" color="textPrimary" >
                        Gente que Responde!
                    </Typography>
                </span>

                    <br/>
                    <br/>
                    <br/>

                   <div style={{
                       display:'flex',
                        flexFlow:'row wrap',
                        justifyContent:'center',
                        alignItems:'center',
                        alignContent:'center',
                        width:'100%'
                        }}>

                    
                            <Button onClick={()=>{setAppLoader(true),push("/accesorios")}} style={{margin:'5px'}} variant="outlined" >Accesorios</Button>
                        
                            <Button onClick={()=>{setAppLoader(true),push("/repuestos")}} style={{margin:'5px'}} variant="outlined" >repuestos</Button>
                        
                            <Button onClick={()=>{setAppLoader(true),push("/telefonos")}} style={{margin:'5px'}} variant="outlined" >telefonos</Button>
                        
                            <Button onClick={()=>{setAppLoader(true),push("/serviciotecnico")}} style={{margin:'5px'}} variant="outlined" >Servicio técnico</Button>
                        
                   </div>
            </div>
            <Container>
                <Typography color="textPrimary" component="h2" variant="h5" style={{textAlign:'center',margin:'0 0 20px 0'}} >
                        {accesorios.length > 0 ? 'Forros, vidrio templado y más accesorios para telefonos' :null}
                </Typography>
                <GridProducts accesorios={accesorios} setAlterEvent={setAlterEvent} />

                <Typography component="h2" color="textPrimary" variant="h5" style={{textAlign:'center',margin:'20px 0'}} >
                        {repuestos.length > 0 ? 'Repuestos y partes para telefonos' :null}
                </Typography>

                <GridRepuestos repuestos={repuestos} setAlterEvent={setAlterEvent} />
            </Container>
        </>
    )
}

export default Template(Index)