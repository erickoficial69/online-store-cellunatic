import { useState, useEffect } from 'react'
import { Button, Container, Grid, Input, List, ListItem, ListItemSecondaryAction, Typography, FormControl, InputLabel, FormGroup, Select } from '@material-ui/core'
import { Update, Delete, PlusOne, ArrowBack } from '@material-ui/icons'
import { Repuesto, Producto } from '../interfaces/interfaces'
import * as repuestoServ from './controllers/repuestos.controllers'
import * as productoServ from './controllers/productos.controllers'
import { useRouter } from 'next/router'

interface Props {
    id: string
    setAppLoader?: any
    setModalNewProduct?: any
}
type Input = any

export const ManageRepuesto = ({ setAppLoader, id }: Props) => {
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
    const { back, push } = useRouter()
    const [productos, setProductos] = useState<Producto[]>([])
    const [repuesto, setRepuesto] = useState<Repuesto>(initialState)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)

    const changeRepuesto = async (param: Input) => {

        setRepuesto({ ...repuesto, [param.target.name]: param.target.value })
    }

    const changeImage = async (param: Input) => {
        setAppLoader(true)
        const {imagenes} = repuesto
            let img = param.target.name
            /* 
            let base64: string | any = await repuestoServ.toBase64(param.target.files[0]).catch(err => {
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
            setAppLoader(false)
    }

    const update = async () => {
        
        back()
    }

    const drop = async () => {
        setAppLoader(true)
        const res = await repuestoServ.deleteRepuesto(repuesto)
        setRepuesto(res)
        back()
    }

    const clean = () => {
        setAppLoader(true)
        setRepuesto(initialState)
        setAppLoader(false)
    }

    const create = async () => {
        if (repuesto.nombre === '' || !repuesto.imagenes || repuesto.modelo === '' || repuesto.precio === 0 || repuesto.producto === '') return alert('Rellene todos los campos')
        setAppLoader(true)
        await repuestoServ.createRepuesto(repuesto)

        push('/cpanel')
    }
    
    const setComponent = async () => {
        setAppLoader(true)
        if(id=='new'){
            clean()
            fetchProducts()
            setAppLoader(false)
            return
        }
        const { repuesto } = await repuestoServ.getRepuesto(id)
        fetchProducts()
        setRepuesto(repuesto)
        setPreviewImage(repuesto.imagenes.imagen1)
        setAppLoader(false)
    }

    const fetchProducts = async () => {
        const productos = await productoServ.getProductos()
        setProductos(productos)
    }

    useEffect(() => {
        setComponent()
    }, [])

    return (
        <Container >
            <Grid container spacing={4} direction="row" alignContent="center" >

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
                        position: 'relative'
                    }} >

                        <img style={{height: "90%",width: "90%",objectFit: "contain",position: 'relative'}}
                            src={previewImage}/>

                        <Grid container style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10}}>
                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <Input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px" }} className="inputImage" name="imagen1" type="url" onChange={changeImage} value={repuesto.imagenes?repuesto.imagenes.imagen1:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen1)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes?repuesto.imagenes.imagen1:'/logo.png'} alt={repuesto.producto} />
                            </Grid>

                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <Input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px" }} className="inputImage" name="imagen2" type="url" onChange={changeImage} value={repuesto.imagenes?repuesto.imagenes.imagen2:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen2)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes?repuesto.imagenes.imagen2:'/logo.png'} alt={repuesto.producto} />
                            </Grid>

                            <Grid item xs={4} style={{position:'relative',textAlign:'center'}} >
                                <Input style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:10,height:"30px" }} className="inputImage" name="imagen3" type="url" onChange={changeImage} value={repuesto.imagenes?repuesto.imagenes.imagen3:'/logo.png'} />
                                <img onClick={()=>setPreviewImage(repuesto.imagenes.imagen3)} style={{height: "60px",width: "60px",margin:'0 auto',objectFit: "contain",position: 'relative'}} src={repuesto.imagenes?repuesto.imagenes.imagen3:'/logo.png'} alt={repuesto.producto} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <List style={{maxWidth:'480px'}} >
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Nombre:</InputLabel>
                                <Input name="nombre" onChange={changeRepuesto} value={repuesto.nombre} />
                            </FormControl>

                            <FormControl>
                                <InputLabel>Color:</InputLabel>
                                <Input name="color" inputMode="text" onChange={changeRepuesto} value={repuesto.color} />
                            </FormControl>

                            <FormControl>
                                <InputLabel>Modelo:</InputLabel>
                                <Input name="modelo" inputMode="text" onChange={changeRepuesto} value={repuesto.modelo} />
                            </FormControl>

                            <FormControl>
                            <InputLabel>Producto:{repuesto.producto} </InputLabel>
                                <Select style={{ padding: '5px', minWidth: '200px', background: 'transparent', borderBottom: '1px solid orange' }} name="producto" onChange={changeRepuesto}>
                                    
                                    {
                                        productos.map((producto: Producto) => {
                                            return (
                                                <Typography style={{cursor:'pointer',padding:'4px'}} component="option" key={producto._id} value={producto.nombre} >
                                                    {producto.nombre}
                                                </Typography>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel>Estado:</InputLabel>
                                <Select style={{ padding: '5px', minWidth: '200px', background: 'transparent', borderBottom: '1px solid orange' }} name="estado" onChange={changeRepuesto}>
                                    
                                    <Typography style={{cursor:'pointer',padding:'4px'}} component="option" value={1} >
                                        disponible
                                    </Typography>
                                    <Typography style={{cursor:'pointer',padding:'4px'}} component="option" value={0} >
                                        agotado
                                    </Typography>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel>Precio:</InputLabel>
                                <Input name="precio" inputMode="decimal" type="number" onChange={changeRepuesto} value={repuesto.precio} />
                            </FormControl>
                        </FormGroup>

                        <ListItem>
                            {
                                id!=='new'?(
                                    <>
                                        <Button size="small" onClick={update} variant="contained" style={{ backgroundColor: 'purple', width: '120px', color: 'white' }} startIcon={<Update />} >Actualizar</Button>
                                        <ListItemSecondaryAction>
                                            <Button size="small" onClick={drop} variant="contained" style={{ backgroundColor: 'darkorange', width: '120px' }} startIcon={<Delete />} >Eliminar</Button>
                                        </ListItemSecondaryAction>
                                    </>
                                ):(
                                    <>
                                        <Button size="small" onClick={create} variant="contained" style={{ backgroundColor: 'green', width: '120px', color: 'white' }} startIcon={<PlusOne />} >Agregar</Button>
                                        <ListItemSecondaryAction>
                                            <Button size="small" onClick={()=>{
                                                back()
                                                }} variant="contained" style={{ backgroundColor: 'lightgreen', width: '120px' }} startIcon={<ArrowBack />} >Regresar</Button>
                                        </ListItemSecondaryAction>
                                    </>
                                )
                            }
                        </ListItem>
                        <ListItem>
                            {
                                id!=='new'?(
                                    <ListItemSecondaryAction style={{margin:'10px 0'}} >
                                            <Button size="small" onClick={()=>{
                                                setAppLoader(true)
                                                clean()
                                                push('/detallerepuesto/new')
                                                setAppLoader(false)
                                                }} variant="contained" style={{ backgroundColor: 'lightgreen', width: '120px',margin:'10px 0'}} >Nuevo</Button>
                                    </ListItemSecondaryAction>
                                ):null
                            }
                        </ListItem>
                    </List>

                </Grid>
            </Grid>
        </Container>
    )
}