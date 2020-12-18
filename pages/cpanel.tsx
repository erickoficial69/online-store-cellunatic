import { Container, FormGroup, Input, Typography, FormControl, InputLabel, NativeSelect, Grid, Button, IconButton, Box, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Hidden } from '@material-ui/core'
import { Cancel, Edit, MonetizationOn, Email, Facebook, Instagram, Phone, PowerSettingsNew, Remove, Telegram, Twitter, Update, WhatsApp } from '@material-ui/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Template from '../components/App'
import { updateApp, updateTasa } from '../components/controllers/cpanel.controllers'
import { Context, Producto, User } from '../interfaces/interfaces'
import * as productoServ from '../components/controllers/productos.controllers'

interface Props {
    context: Context
}
const emptyProduct:Producto ={
    nombre:'',
    seccion:'',
    estado:true
} 
type InputTarget = ChangeEvent<HTMLInputElement>

const Cpanel = ({ context }: Props) => {
    const { push } = useRouter()
    const { setAppLoader, verifySesion, app, setApp, destroySesion, tasaCambio, setTasaCambio } = context
    const [user, setUser] = useState<User>({ correo: '', password: '' })
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [edit,setEdit] = useState<boolean>(false)
    const [productos,setProductos] = useState<Producto[]>([])
    const [producto,setProducto] = useState<Producto>(emptyProduct)
    const [editTasaCambio,setEditTasaCambio] = useState<boolean>(false)

    const setContact = (e: InputTarget) => {
        const { contact } = app

        setApp({ ...app, contact: { ...contact, [e.target.name]: e.target.value } })
    }

    const setAppData = (e: InputTarget) => {

        setApp({ ...app, [e.target.name]: e.target.value })
    }

    const productChange=(param:any,data?:Producto)=>{
        if(data) return setProducto(data)
        setProducto({...producto,[param.target.name]:param.target.value})
    }

    const saveChanges = async () => {
        setAppLoader(true)
        await updateApp(app)
        setAppLoader(false)
        setOpenDrawer(false)
    }
    const addProduct = async () => {
        if(producto.nombre === '' || producto.seccion === '') return alert('rellene todos los campos')
        setAppLoader(true)
        await productoServ.createProducto(producto)
        setProducto(emptyProduct)
        getProducts()
    }
    const updateProduct = async () => {
        if(producto.nombre === '' || producto.seccion === '') return alert('rellene todos los campos')
        setAppLoader(true)
        await productoServ.updateProducto(producto)
        setProducto(emptyProduct)
        setEdit(false)
        getProducts()
    }

    const updateTasaCambio = async()=>{
        setAppLoader(true)
        await updateTasa(tasaCambio)
        setEditTasaCambio(false)
        setAppLoader(false)
    }

    const deleteProduct = async(id:string)=>{
        setAppLoader(true)
        await productoServ.deleteProducto(id)
        getProducts()
    }

    const getProducts = async()=>{
        setAppLoader(true)
        const res = await productoServ.getProductos()
        setProductos(res)
        setAppLoader(false)
    }

    useEffect(() => {
        const result = verifySesion()

        if (result.correo === "") push('/login')

        setUser(result)
        getProducts()
    }, [])

    return (
        <>
            <Head>
                <title>Cellunatic - cpanel</title>
            </Head>

            {user.rango && user.rango === "administrador" ? (
                <>
                    <Hidden smUp>
                        <List style={{ marginTop: '65px' }}>
                            <ListItem>
                                <ListItemIcon>
                                    <img src="/logo192x192.png" width="32px" alt={app.name + " logo"} />
                                </ListItemIcon>
                                <ListItemText style={{color:'white'}} >{app.name}</ListItemText>
                            </ListItem>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => setOpenDrawer(true)}><Edit /></IconButton>

                                <IconButton onClick={() => {
                                    const result = destroySesion()

                                    if (result && result.correo === "") push('/login')
                                }} ><PowerSettingsNew /></IconButton>
                            </ListItemSecondaryAction>
                        </List>
                    </Hidden>

                    <Hidden xsDown>
                        <Box bgcolor="rgba(0,0,0,.7)" style={{ position: 'relative', padding: '20px 0', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'flex-start',marginTop:'65px' }} >
                            
                            <img style={{ width: '80px', height: '80px', margin: '0 10px' }} src="/logo192x192.png" alt={app.name + " logo"} />
                            
                            <List style={{width:'100%'}}>
                                <ListItem>
                                    <ListItemText>{app.name}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <Button onClick={() => setOpenDrawer(true)} startIcon={<Edit />} >Edit.</Button>

                                        <Button onClick={() => {
                                            const result = destroySesion()

                                            if (result && result.correo === "") push('/login')
                                        }} startIcon={<PowerSettingsNew />} >Logout</Button>
                                    </ListItemSecondaryAction>
                                </ListItem>

                            </List>
                        </Box>
                    </Hidden>
                
                    <div onClick={() => setOpenDrawer(false)} style={{ position: 'fixed', width: '100vw', height: '100vh', right: openDrawer ? 0 : '-100vw', top: 0, background: 'rgba(0,0,0, .7)', zIndex: 9000 }} ></div>
                    <Box bgcolor="rgb(10,10,10)" className="myDrawer" style={{ padding:'4px 10px', position: 'fixed', width: '100%',maxWidth:'420px', height: '100vh', overflowX: 'hidden', overflowY: 'auto', left: openDrawer ? 0 : '-100vw', top: 0, zIndex: 9001 }}>
                        <div style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',alignItems:'center'}} >
                            <Typography color="textPrimary" variant="h5">Datos de la app</Typography>
                            <Button variant="outlined" size="small" onClick={() => setOpenDrawer(false)}>cerrar</Button>
                        </div>
                        <FormGroup style={{position: 'relative' }}>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Typography>Keywords</Typography></InputLabel>
                                <Input onChange={setAppData} inputMode="text" name="keywords" value={app.keywords} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Typography>Dirección</Typography></InputLabel>
                                <Input onChange={setAppData} inputMode="text" name="addres" value={app.addres} />
                            </FormControl>

                            <Button size="small" style={{ marginTop: '10px' }} variant="contained" onClick={saveChanges} startIcon={<Update />} >Actualizar</Button>
                        </FormGroup>

                        <FormGroup style={{ position: 'relative' }}>
                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Twitter /></InputLabel>
                                <Input inputMode="url" name="twitter" onChange={setContact} value={app.contact.twitter} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Phone /></InputLabel>
                                <Input inputMode="tel" type="tel" name="phone" onChange={setContact} value={app.contact.phone} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><WhatsApp /></InputLabel>
                                <Input inputMode="tel" type="tel" name="whatsapp" onChange={setContact} value={app.contact.whatsapp} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Telegram /></InputLabel>
                                <Input inputMode="url" name="telegram" onChange={setContact} value={app.contact.telegram} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Email /></InputLabel>
                                <Input inputMode="email" name="email" onChange={setContact} value={app.contact.email} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Facebook /></InputLabel>
                                <Input inputMode="url" name="facebook" onChange={setContact} value={app.contact.facebook} />
                            </FormControl>

                            <FormControl style={{margin:'10px 0'}}>
                                <InputLabel><Instagram /></InputLabel>
                                <Input inputMode="url" name="instagram" onChange={setContact} value={app.contact.instagram} />
                            </FormControl>

                            <Button size="small" style={{ marginTop: '10px' }} variant="contained" onClick={saveChanges} startIcon={<Update />} >Actualizar</Button>
                        </FormGroup>
                    </Box>


                    <Container>
                {/****************** Tasa de Cambio ****************/}
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <MonetizationOn />
                                </ListItemIcon>
                                <ListItemText style={{color:'white'}} >
                                    1$ = {tasaCambio.monto} bs
                                </ListItemText>
                            </ListItem>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => setEditTasaCambio(!editTasaCambio?true:false)}><Edit /></IconButton>
                            </ListItemSecondaryAction>
                        </List>
                {/****************** Formulario para actualizar Tasa de Cambio ****************/}
                        {
                            editTasaCambio?(
                                <FormGroup>
                                    <FormControl>
                                        <InputLabel>{tasaCambio.monto} bs</InputLabel>
                                        <Input inputMode="numeric" onChange={(e:any)=>{
                                            setTasaCambio({...tasaCambio,monto:e.target.value})
                                        }} />
                                    </FormControl>

                                    <FormControl>
                                        <Button onClick={updateTasaCambio} >Actializar</Button>
                                    </FormControl>
                                </FormGroup>
                            ):null
                        }
                {/****************** Botones para agregar accesorios y repuestos ****************/}
                        <List>
                            <ListItem >
                                <Button style={{margin:'5px'}} color="primary" variant="contained" size="small" onClick={() => {
                                        setAppLoader(true)
                                        push('/detalleaccesorio/new')}} >
                                            Nuevo Accesorio
                                </Button>

                                <Button style={{margin:'5px'}} color="primary" variant="contained" size="small" onClick={() => {
                                        setAppLoader(true)
                                        push('/detallerepuesto/new')}} >
                                            Nuevo Repuesto
                                </Button>
                            </ListItem>
                        </List>

                {/****************** Listado de productos en Grid ****************/}
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                    <Box style={{maxWidth:'600px',maxHeight:'800px',overflowX:'hidden',overflowY:'auto',position:'relative',margin:'0 auto'}}>
                                        <List>
                                            {
                                                productos.length > 0 ?(
                                                    productos.map((rsProduct:Producto)=>(
                                                        <ListItem style={{border:'1px solid white',borderRadius:5}} key={rsProduct._id} >
                                                            <ListItemText style={{color:'white'}} >
                                                                {rsProduct.nombre} <b>seccion: {rsProduct.seccion}</b> 
                                                            </ListItemText>
                                                            <ListItemIcon>
                                                                {edit?(<IconButton onClick={()=>{setEdit(false),setProducto(emptyProduct)}} >
                                                                        <Cancel />
                                                                    </IconButton>
                                                                ):(<IconButton onClick={()=>{setEdit(edit?false:true),setProducto(rsProduct)}} >
                                                                        <Edit />
                                                                    </IconButton>
                                                                )}
                                                            </ListItemIcon>
                                                            <ListItemSecondaryAction>
                                                                <ListItemIcon>
                                                                    <IconButton>
                                                                        <Remove onClick={()=>{
                                                                            if(edit) return
                                                                            deleteProduct(rsProduct._id?rsProduct._id:'')
                                                                        }} />
                                                                    </IconButton>
                                                                </ListItemIcon>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))
                                                ):null
                                            }
                                        </List>
                                    </Box>
                            </Grid>

                {/****************** Formulario actualizar o agregar un producto ****************/}

                            <Grid item xs={12} md={6}>
                                <Box style={{maxWidth:'600px',position:'relative',margin:'0 auto'}}>
                                    <FormGroup style={{background:'rgb(20,20,20)',borderRadius:5,padding:5}} >
                                        <Typography color="textPrimary" variant="h5" style={{textAlign:'center'}} >Añadir un producto</Typography>
                                        <FormControl style={{margin:'10px 0'}}>
                                            <InputLabel>Nombre</InputLabel>
                                            <Input name="nombre" value={producto.nombre} onChange={productChange}/>
                                        </FormControl>

                                        <FormControl style={{margin:'10px 0'}}>
                                            <InputLabel>Seccion:</InputLabel>
                                            <NativeSelect defaultValue="" inputProps={{
                                                name:'seccion'
                                            }} onChange={(param:any)=>productChange(param)} >
                                                <option value="" >ninguno</option>
                                                <option value="accesorios" >accesorios</option>
                                                <option value="repuestos" >repuestos</option>
                                                <option value="telefonos" >telefonos</option>
                                                <option value="serviciotecnico" >servicio tecnico</option>
                                            </NativeSelect>
                                        </FormControl>

                                        <FormControl style={{margin:'10px 0'}}>
                                            {
                                                edit?(
                                                    <>
                                                    <Button style={{margin:'5px'}} onClick={updateProduct}>actualizar</Button>
                                                    <Button style={{margin:'5px'}} onClick={()=>{setEdit(false),setProducto(emptyProduct)}}>cancelar</Button>
                                                    </>
                                                ):<Button onClick={addProduct}>Añadir</Button>
                                            }
                                        </FormControl>
                                    </FormGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            ) : null}

            <style>
                {
                    `.myDrawer{
                        transition:all .3s ease-out;
                    }
                    `
                }
            </style>
        </>
    )
}

export default Template(Cpanel)