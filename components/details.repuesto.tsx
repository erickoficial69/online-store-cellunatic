import { useState, useEffect } from 'react'
import { Button, Container, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core'
import { AddShoppingCart, Share } from '@material-ui/icons'
import { Repuesto, AppData, TasaCambio } from '../interfaces/interfaces'
import * as repuestoServ from './controllers/repuestos.controllers'
import Head from 'next/head'
import { GridRepuestos } from './repuestos.grid'
import ModalCompra from './modal.compra'

type Rela ={
    repuesto:Repuesto
    relacionados:Repuesto[]
}

interface Props {
    id: string
    setAppLoader?: any
    app:AppData
    tasaCambio:TasaCambio
}

export const DetailsRepuesto = ({ id, setAppLoader, app, tasaCambio }: Props) => {
    const initialState = {
        nombre: '',
        color: '',
        estado: false,
        imagenes: {
            imagen1:'/logo.png',
            imagen2:'/logo.png',
            imagen3:'/logo.png'
        },
        modelo: '',
        precio: 0,
        producto: ''
    }

    const [alterEvent, setAlterEvent] = useState<boolean>(false)
    const [similares, setSimilares] = useState<Repuesto[]>([])
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)
    const [repuesto, setRepuesto] = useState<Repuesto>(initialState)
    const [modalBuy,setModalBuy] = useState<boolean>(false)

    const shareApi= async(message:any)=>{
        try{
            await navigator.share(message)
        }catch(err){
            let uri = `https://api.whatsapp.com/send?text=${message.text} ${document.location.href}`
            
            alert(uri)
        }
    }

    const startComponent = async () => {
        setAppLoader(true)
        if(id!=='new'){
            const { repuesto, relacionados }:Rela = await repuestoServ.getRepuesto(id)
            setPreviewImage(repuesto.imagenes.imagen1)
                setRepuesto(repuesto)
            if(relacionados.length  > 1){
                setSimilares(relacionados)
            }
            setRepuesto(repuesto)
            setAppLoader(false)
            return
        }
    }
    useEffect(() => {
        startComponent()
    }, [id, alterEvent])

    return (
        <Container >
            <Head>
                <title>{repuesto.nombre} {repuesto.producto} </title>
            </Head>
            <Button color="primary" variant="outlined" onClick={shareApi} >Share</Button>
            <Grid container spacing={4}>

                <Grid item xs={12} sm={6} >
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
                        position:'relative'
                    }} >

                        <img style={{height: "90%",width: "90%",objectFit: "contain",position: 'relative'}}
                            src={process.env.API+'/'+previewImage}
                            alt={""} />

                        <Grid container style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10, background:'rgba(5,5,5,.5)'}}>
                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes.imagen1?process.env.API+'/'+repuesto.imagenes.imagen1:'/logo.png'} alt={repuesto.producto} />
                            </Grid>

                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes.imagen2?process.env.API+'/'+repuesto.imagenes.imagen2:'/logo.png'} alt={repuesto.producto} />
                            </Grid>

                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes.imagen3?process.env.API+'/'+repuesto.imagenes.imagen3:'/logo.png'} alt={repuesto.producto} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" >{repuesto.nombre}</Typography>
                    <List>
                        {repuesto.color!==""?(
                            <ListItem>
                                <ListItemText>Color:</ListItemText>
                                <ListItemText>{repuesto.color}</ListItemText>
                            </ListItem>
                        ):null}
                        <ListItem>
                            <ListItemText>Producto:</ListItemText>
                            <ListItemText>{repuesto.producto}</ListItemText>
                        </ListItem>
                        {
                            repuesto.modelo !== "" ? (
                                <ListItem>
                                    <ListItemText>Modelo:</ListItemText>
                                    <ListItemText>{repuesto.modelo}</ListItemText>
                                </ListItem>
                            ) : null
                        }
                        <ListItem>
                            <ListItemText>Estado:</ListItemText>
                            <ListItemText>{repuesto.estado ? "disponible" : "agotado"}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Precio:</ListItemText>
                            <ListItemText>{repuesto.precio} $ / {repuesto.precio * tasaCambio.monto} bs</ListItemText>
                        </ListItem>
                        {/** Acciones para este producto */}
                        <ListItem>
                            <Button onClick={()=>setModalBuy(true)} size="small" variant="contained" style={{ backgroundColor: 'orange' }} startIcon={<AddShoppingCart />} >Comprar</Button>
                            <ListItemSecondaryAction>
                                <Button variant="outlined" color="secondary" onClick={()=>{
                                    const message = {
                                        title: repuesto.nombre,
                                        text: `Tenemos las mejores ofertas en ${repuesto.producto}`,
                                        url: document.location.href
                                    }
                                        shareApi(message)
                                    }} startIcon={<Share/>} >Compartir</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>

                </Grid>
            </Grid>

            <Typography variant="h4" >
                Productos Relacionados
            </Typography>

            <GridRepuestos repuestos={similares} setAlterEvent={setAlterEvent} />

            {/**Modal Compra */}

            {modalBuy?<ModalCompra app={app} setModal={setModalBuy} />:null}
        </Container>
    )
}
