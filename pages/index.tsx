import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import Template from "../components/App";
import { GridProducts } from "../components/products.grid";
import { Accesorio, Repuesto,Context} from '../interfaces/interfaces'
import {getAccesorios} from '../components/controllers/accesorios.controllers'
import {getRepuestos} from '../components/controllers/repuestos.controllers'
import {GetStaticProps,GetStaticPropsContext} from 'next'
import { GridRepuestos } from "../components/repuestos.grid";
import {useRouter} from 'next/router'


interface Props{
    context:Context
    accesorios:Accesorio[]
    repuestos:Repuesto[]
}

const Index=({context,accesorios,repuestos}:Props)=>{
    const {setAppLoader,appLoader} = context
    const [alterEvent,setAlterEvent] = useState<boolean>(false)
    const {push} = useRouter()

    useEffect(()=>{
        setAppLoader(appLoader?false:true)
    },[alterEvent])

    return(
        <>
            <Head>
                <title>Cellunatic - home</title>
            </Head>

            <div style={{
                position:'relative',
                backgroundImage:'url(img/wp-home.png)',
                backgroundColor:'rgba(0,0,0, .7)',
                backgroundSize:'cover',
                backgroundBlendMode:'multiply',
                height:'100vh',
                maxHeight:'720px',
                display:'flex',
                flexFlow:'column',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center'
                }}>
                
                    <Typography component="h1" style={{textAlign:'center'}} className="coursive" variant="h3" color="textPrimary" >
                        <b>Cellunatic 2017 CG C.A</b>
                    </Typography>
                    <br/>
                    <Typography variant="h5" color="textPrimary" >
                        Gente que Responde!
                    </Typography>

                    <br/>
                    <br/>
                    <br/>

                   <div style={{
                       display:'flex',
                        flexFlow:'row wrap',
                        justifyContent:'center',
                        alignItems:'center',
                        alignContent:'center'}}>

                    
                            <Button onClick={()=>{setAppLoader(true),push("/accesorios")}} style={{margin:'5px'}} variant="outlined" >Accesorios</Button>
                        
                        
                            <Button onClick={()=>{setAppLoader(true),push("/repuestos")}} style={{margin:'5px'}} variant="outlined" >repuestos</Button>
                        

                        
                            <Button onClick={()=>{setAppLoader(true),push("/telefonos")}} style={{margin:'5px'}} variant="outlined" >telefonos</Button>
                        
                        
                            <Button onClick={()=>{setAppLoader(true),push("/serviciotecnico")}} style={{margin:'5px'}} variant="outlined" >Servicio técnico</Button>
                        
                   </div>
            </div>
            <Container>
                <Typography color="textPrimary" component="h2" variant="h5" style={{textAlign:'center',margin:'20px 0'}} >
                        {accesorios.length > 0 ? 'Forros, vidrio templado y más accesorios para telefonos' :null}
                </Typography>
                <GridProducts accesorios={accesorios} setAlterEvent={setAlterEvent} />

                <Typography component="h2" color="textPrimary" variant="h5" style={{textAlign:'center',margin:'20px 0'}} >
                        {repuestos.length > 0 ? 'Repuestos y partes para telefonos' :null}
                </Typography>

                <GridRepuestos repuestos={repuestos} setAlterEvent={setAlterEvent}/>
            </Container>
        </>
    )
}

export const getStaticProps:GetStaticProps = async(_:GetStaticPropsContext)=>{
    const {accesories} = await getAccesorios(6)
    const {repuestos} = await getRepuestos(6)
    return {
        props:{
            repuestos,accesorios:accesories
        }
    }
}

export default Template(Index)