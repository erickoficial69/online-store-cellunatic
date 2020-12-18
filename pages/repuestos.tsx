import { useEffect, useState, ChangeEvent } from "react";
import Head from "next/head";
import Template from "../components/App";
import { GridRepuestos } from "../components/repuestos.grid";
import { Repuesto, Context, Producto, User } from '../interfaces/interfaces'
import {getCustomRepuesto} from '../components/controllers/repuestos.controllers'
import { Button, Container, Box, List, ListItem, ListItemText, Hidden } from "@material-ui/core";
import { getProductos } from "../components/controllers/productos.controllers";
import { Search } from "@material-ui/icons";

interface Props{
    context:Context
}

type SearchParam=ChangeEvent<HTMLInputElement>

const Repuestos=({context}:Props)=>{
    const {setAppLoader,verifySesion} = context
    const [search,setSearch] = useState<string>('')
    const [productos,setProductos] = useState<Producto[]>([])
    const [repuestos,setRepuestos] = useState<Repuesto[]>([])
    const [limit,setLimit] = useState<number>(12)
    const [allCollections,setAllCollections] = useState<number>(0)
    const [user,setUser] = useState<User>({correo:'',password:''})
    const [alterEvent,setAlterEvent] = useState<boolean>(false)

    const changueSearch=(param:SearchParam)=>{
        if(param.target.value==="") return
        setSearch(param.target.value)
    }

    const enter= async(e:any)=>{
        e.preventDefault()
        setAppLoader(true)
        setSearch(e.target.search.value)
    }

    const moreRepuestos=()=>{
        setLimit(limit+12)
    }

    const getRepuestos = async()=>{
        setAppLoader(true)
        const {repuestos,count} = await getCustomRepuesto(search,limit)
        setRepuestos(repuestos)
        setAllCollections(count)
        setAppLoader(false)
    }

    const getProducto = async ()=>{
        setAppLoader(true)
        const productos = await getProductos()
        setProductos(productos)
        setAppLoader(false)
    }

    useEffect(()=>{
        const result = verifySesion()
        setUser(result)
        getProducto()
        getRepuestos()
    },[])

    useEffect(()=>{
        getRepuestos()
    },[limit,search,alterEvent])

    return(
        <>
            <Head>
                <title>Cellunatic - Repuestos</title>
            </Head>

            <form onSubmit={enter} style={{width:'100%',position:'fixed',top:70,left:0,right:0,textAlign:'center',zIndex:1000}}>
                <input name="search" type="search" onChange={changueSearch} style={{padding:'8px',width:'70%',borderRadius:5,position:'relative',margin:'0 auto'}} placeholder="Buscar"/>
                <button style={{position:'absolute',top:5,zIndex:10,right:'calc(15% + 24px)',background:'transparent'}}><Search /></button>
            </form>
            <Container style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',paddingTop:90}}>
                <Hidden smDown >  
                    <List >
                        <ListItem onClick={()=>setSearch('')} button>
                            <ListItemText style={{color:'white'}} >
                                Todos
                            </ListItemText>
                        </ListItem>
                        {
                            productos.length > 0 ? productos.map((p:Producto)=>{
                                return(
                                    <ListItem onClick={()=>setSearch(p.nombre)} button>
                                        <ListItemText style={{color:'white',width:150}} >
                                            {p.nombre}
                                        </ListItemText>
                                    </ListItem>
                                )
                            }):null
                        }
                    </List>
                </Hidden> 

                <div style={{width:'100%'}}>
                    <GridRepuestos setAlterEvent={setAlterEvent} user={user} repuestos={repuestos} />

                    <Box>
                        {allCollections>12?<Button size="small" variant="contained" onClick={moreRepuestos} >Mostrar más</Button>:null}
                    </Box>
                </div>
            </Container>
        </>
    )
}

export default Template(Repuestos)