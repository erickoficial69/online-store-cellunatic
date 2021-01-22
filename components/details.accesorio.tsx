import { useState, useEffect } from 'react'
import { Button, Container, Grid, List, ListItem, ListItemText, Typography, ListItemSecondaryAction } from '@material-ui/core'
import { AddShoppingCart, Share } from '@material-ui/icons'
import { Accesorio, AppData, TasaCambio } from '../interfaces/interfaces'
import * as accesorioServ from './controllers/accesorios.controllers'
import Head from 'next/head'
import { GridProducts } from './products.grid'
import ModalCompra from './modal.compra'

type Rela ={
    accesorie:Accesorio
    relacionados:Accesorio[]
}
interface Props {
    id: string
    setAppLoader?: any
    setModalNewProduct?: any
    app:AppData
    tasaCambio:TasaCambio
}

export const DetailsAccesorio = ({ id, setAppLoader, app, tasaCambio }: Props) => {
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

    const [alterEvent, setAlterEvent] = useState<boolean>(false)
    const [similares, setSimilares] = useState<Accesorio[]>([])
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)
    const [accesorio, setAccesorio] = useState<Accesorio>(initialState)
    const [modalBuy,setModalBuy] = useState<boolean>(false)

    const shareApi= async (message:any)=>{
        
        try{
            await navigator.share(message)
        }catch(err){
            var aux = document.createElement("input");

            // Asigna el contenido del elemento especificado al valor del campo
            aux.setAttribute("value", document.location.href);

            // Añade el campo a la página
            document.body.appendChild(aux);

            // Selecciona el contenido del campo
            aux.select();

            // Copia el texto seleccionado
            document.execCommand("copy");

            // Elimina el campo de la página
            document.body.removeChild(aux);
            alert('Enlace copiado al portapapeles')
        }
    }

    const startComponent = async () => {
        setAppLoader(true)
        if(id!=='new'){
            const { accesorie, relacionados }:Rela = await accesorioServ.getAccesorio(id)
            setPreviewImage(accesorie.imagenes.imagen1)
            setAccesorio(accesorie)
            if(relacionados.length  > 1){
                setSimilares(relacionados)
            }
            setSimilares(relacionados)
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
                <title>{accesorio.nombre}</title>
            </Head>

            <Typography component="h1" color="textPrimary" variant="h4" >{accesorio.nombre}</Typography>

            <br/><br/>

            <Grid container spacing={4}>

                <Grid item xs={12} sm={6}>
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
                            alt={accesorio.nombre+" imagen"} />

                        <Grid container style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,background:'rgba(5,5,5,.5)'}}>
                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <img onClick={()=>setPreviewImage(accesorio.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={accesorio.imagenes.imagen1?process.env.API+'/'+accesorio.imagenes.imagen1:'/logo192x192.png'} alt={accesorio.producto} />
                            </Grid>

                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <img onClick={()=>setPreviewImage(accesorio.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={accesorio.imagenes.imagen2?process.env.API+'/'+accesorio.imagenes.imagen2:'/logo192x192.png'} alt={accesorio.producto} />
                            </Grid>

                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <img onClick={()=>setPreviewImage(accesorio.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={accesorio.imagenes.imagen3?process.env.API+'/'+accesorio.imagenes.imagen3:'/logo192x192.png'} alt={accesorio.producto} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <List>
                        {accesorio.color!==""?(
                            <ListItem>
                                <ListItemText>Color:</ListItemText>
                                <ListItemText>{accesorio.color}</ListItemText>
                            </ListItem>
                        ):null}
                        <ListItem style={{color:'white'}} >
                            <ListItemText>Producto:</ListItemText>
                            <ListItemText>{accesorio.producto}</ListItemText>
                        </ListItem>
                        {
                            accesorio.modelo !== "" ? (
                                <ListItem style={{color:'white'}} >
                                    <ListItemText>Modelo:</ListItemText>
                                    <ListItemText>{accesorio.modelo}</ListItemText>
                                </ListItem>
                            ) : null
                        }
                        <ListItem style={{color:'white'}} >
                            <ListItemText>Estado:</ListItemText>
                            <ListItemText>{accesorio.estado ? "disponible" : "agotado"}</ListItemText>
                        </ListItem>
                        <ListItem style={{color:'white'}} >
                            <ListItemText>Precio:</ListItemText>
                            <ListItemText>{accesorio.precio} $ / {accesorio.precio * tasaCambio.monto} bs</ListItemText>
                        </ListItem>
                    </List>
                    {/** Acciones para este producto */}
                    <ListItem>
                        <Button onClick={()=>setModalBuy(true)} color="secondary" size="small" variant="contained" startIcon={<AddShoppingCart />} >Comprar</Button>
                        <ListItemSecondaryAction>
                            <Button variant="contained" color="primary" onClick={()=>{
                            const message = {
                                title: accesorio.nombre,
                                text: `Tenemos las mejores ofertas en ${accesorio.producto}`,
                                url: document.location.href
                            }
                                shareApi(message)
                            }} size="small" startIcon={<Share/>}>Compartir</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Grid>
            </Grid>

            <br/><br/>
            <Typography color="textPrimary" variant="h4" >
                {accesorio.producto} más populares
            </Typography>

            <GridProducts accesorios={similares} setAlterEvent={setAlterEvent} />

            {/**Modal Compra */}

            {modalBuy?<ModalCompra app={app} setModal={setModalBuy} />:null}
        </Container>
    )
}
