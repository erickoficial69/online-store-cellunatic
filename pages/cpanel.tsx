import { Container, FormGroup, Input, Typography, FormControl, InputLabel, NativeSelect, Grid, Button, IconButton, Box, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { Cancel, Edit, MonetizationOn, Remove } from '@material-ui/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Template from '../components/App'
import { updateTasa } from '../components/controllers/cpanel.controllers'
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

const Cpanel = ({ context }: Props) => {
    const { push } = useRouter()
    const { setAppLoader, verifySesion, destroySesion, tasaCambio, setTasaCambio } = context
    const [user, setUser] = useState<User>({ correo: '', password: '' })
    const [edit,setEdit] = useState<boolean>(false)
    const [productos,setProductos] = useState<Producto[]>([])
    const [producto,setProducto] = useState<Producto>(emptyProduct)
    const [editTasaCambio,setEditTasaCambio] = useState<boolean>(false)

    const productChange=(param:any,data?:Producto)=>{
        if(data) return setProducto(data)
        setProducto({...producto,[param.target.name]:param.target.value})
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

    return user.rango && user.rango === "administrador" ? (
                <>
                <Head>
                    <title>Cellunatic - cpanel</title>
                </Head>
                <Container>
                {/****************** Botones Para tareas principales del administrador ****************/}
                        <List style={{marginTop:'65px'}} >
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

                                <Button style={{margin:'5px'}} color="primary" variant="contained" size="small" onClick={() => {
                                        setAppLoader(true)
                                        push('/appsettings')}} >
                                            App Info
                                </Button>
                                <Button style={{margin:'5px'}} color="primary" variant="contained" size="small" onClick={() => {
                                        const result = destroySesion()

                                        if (result && result.correo === "") push('/login')}} >
                                            Cerrar Sesion
                                </Button>
                            </ListItem>
                        </List>

                {/****************** Listado de productos en Grid ****************/}
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6} md={4}>
                            {/****************** Tasa de Cambio ****************/}

                            <Box style={{backgroundColor:'rgba(0,0,0, .7)',padding:'5px',borderRadius:'5px'}} >
                                <Typography variant="h6" color="textPrimary" >Tasa de cambio</Typography>
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
                            </Box> 
                        </Grid>

                { editTasaCambio?( 
                        <Grid item xs={12} sm={6} md={4}>
                        {/****************** Formulario para actualizar Tasa de Cambio ****************/}
                            <FormGroup style={{backgroundColor:'rgba(0,0,0, .7)',padding:'5px',borderRadius:'5px'}}>
                                <Typography color="textPrimary" variant="h6" >Actualizar Tasa</Typography>
                                <FormControl>
                                    <InputLabel>{tasaCambio.monto} bs</InputLabel>
                                    <Input inputMode="numeric" onChange={(e:any)=>{
                                            setTasaCambio({...tasaCambio,monto:e.target.value})
                                        }} />
                                </FormControl>

                                <FormControl>
                                    <Button onClick={updateTasaCambio} variant="contained" >Actializar</Button>
                                </FormControl>
                            </FormGroup>
                        </Grid>
                 ):null}

                { productos.length > 0 ?(
                        <Grid item xs={12} sm={6}>
                            <Box style={{backgroundColor:'rgba(0,0,0, .7)',padding:'5px',borderRadius:'5px'}} >
                                <Typography color="textPrimary" variant="h6" >Listado de productos</Typography>
                                <List>
                                    { productos.map((rsProduct:Producto)=>(
                                        <ListItem style={{border:'1px solid white',borderRadius:5}} key={rsProduct._id} >
                                            <ListItemText style={{color:'white'}} >
                                                {rsProduct.nombre} <b>seccion: {rsProduct.seccion}</b> 
                                            </ListItemText>
                                            <ListItemIcon>
                                                {edit?(<IconButton onClick={()=>{setEdit(false),setProducto(emptyProduct)}} ><Cancel />
                                                    </IconButton>
                                                ):(<IconButton onClick={()=>{setEdit(edit?false:true),setProducto(rsProduct)}} ><Edit />
                                                    </IconButton>
                                                )}
                                            </ListItemIcon>
                                            <ListItemSecondaryAction>
                                                <ListItemIcon>
                                                    <IconButton onClick={()=>{
                                                            if(edit) return
                                                            deleteProduct(rsProduct._id?rsProduct._id:'')
                                                        }} >
                                                        <Remove />
                                                    </IconButton>
                                                </ListItemIcon>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))} 
                                </List>
                            </Box>
                        </Grid> ): null }   
                
                {/****************** Formulario actualizar o agregar un producto ****************/}

                        <Grid item xs={12} sm={6} md={4}>
                            <FormGroup style={{backgroundColor:'rgba(0,0,0, .7)',padding:'5px',borderRadius:'5px'}} >
                                <Typography color="textPrimary" variant="h6" >Añadir un producto</Typography>

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
                                            <Button style={{margin:'5px'}} onClick={updateProduct} variant="contained" >actualizar</Button>
                                            <Button style={{margin:'5px'}} onClick={()=>{setEdit(false),setProducto(emptyProduct)}} variant="contained" >cancelar</Button>
                                            </>
                                        ):<Button variant="contained" onClick={addProduct}>Añadir</Button>
                                    }
                                </FormControl>
                            </FormGroup>
                        </Grid>                         
                    </Grid>
                </Container>
            </> ):null
}

export default Template(Cpanel)