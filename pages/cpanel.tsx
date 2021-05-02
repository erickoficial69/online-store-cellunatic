import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Producto, Seccion, User } from '../interfaces/interfaces'
import * as userServ from '../components/controllers/usuarios.controllers'
import * as prodServ from '../components/controllers/productos.controllers'
import * as seccServ from '../components/controllers/secciones.controllers'
import GlobalAppContext from '../context/app/app_state'
import {ManageProduct} from '../components/manage_producto'
import { ManageSection } from '../components/manage_sections'
import { CreateAccesorio } from '../components/create_accesorio'
import { CreateRepuesto } from '../components/create_repuesto'
import { GetStaticProps, GetStaticPropsContext } from 'next'


const Cpanel = () => {
    const { push } = useRouter()
    const { loader,loaderCTRL, tasaCambio, getTasaCambio, updateTasa }:any = useContext(GlobalAppContext)
    const [user, setUser] = useState<User>({ correo: '', password: '' })
    const [tmpTasa,setTmpTasa] = useState<any>(0)
    const [tmpSecc,setTmpSecc] = useState<Seccion>({title:''})
    const [tmpProd,setTmpProd] = useState<Producto>({nombre:'',estado:true,seccion:''})
    const [modal,setModal] = useState<string | boolean>(false)
    const [productos,setProductos] = useState<Producto[]>([{nombre:'',estado:false,seccion:''}])
    const [secciones,setSecciones] = useState<Seccion[]>([{title:''}])

    const updateTasaCambio = async()=>{
        loaderCTRL('load')
        try{
            const result: any = await updateTasa(tmpTasa)
            getTasaCambio(result)
        }catch(err){
            console.log(err)
            alert('algo salió mal')
        }
        
        setModal(false)
        loaderCTRL(false)
    }
    const getProductos = async()=>{
        const list = await prodServ.getProductos()
        setProductos(list)
    }
    const getSecciones = async()=>{
        const list = await seccServ.getSecciones()
        setSecciones(list)
    }
    const manage_section = useMemo(()=><ManageSection seccion={tmpSecc} setTmpSecc={setTmpSecc} setModal={setModal}/>,[tmpSecc])
    const create_repuesto = useMemo(()=><CreateRepuesto setModal={setModal}/>,[])
    const create_accesorio = useMemo(()=><CreateAccesorio setModal={setModal}/>,[])
    const manage_producto = useMemo(()=><ManageProduct producto={tmpProd} setTmpProd={setTmpProd} setModal={setModal}/>,[tmpProd])
    useEffect(() => {
        const result = userServ.verifySesion()

        if (result.correo === "") push('/login')

        setUser(result)
        getTasaCambio()
        getProductos()
        getSecciones()
        loaderCTRL(document.location.pathname)
    }, [loader])

    return user.rango && user.rango === "administrador" ? (
                <main>
                <Head>
                    <title>Cellunatic - cpanel</title>
                </Head>
                <aside>
                    <h3>Dashboard</h3>
                    {/****************** Botones Para tareas principales del administrador ****************/}
                        <ul className="admin_nav" >
                            <li onClick={() => setModal('update_tasa_cambio')}>
                                1$ = {tasaCambio?tasaCambio.monto:null} bs
                            </li>
                            <li onClick={() => setModal('manage_productos')} >
                                Nuevo Producto
                            </li>
                            <li onClick={() => setModal('manage_secciones')} >
                                Nuevo Seccion
                            </li>
                            <li onClick={() => setModal('create_accesorio')} >
                                Nuevo Accesorio
                            </li>
                            <li onClick={() => setModal('create_repuesto')} >
                                Nuevo Repuesto
                            </li>
                            <li onClick={() => {const result = userServ.destroySesion();if (result && result.correo === "") push('/login')}}>
                                Cerrar Sesion :atom
                            </li>
                        </ul>
                </aside>
                <section >
                    {
                        modal=='manage_productos' ?(
                            manage_producto
                        ): modal=='manage_secciones'?(
                            manage_section
                        ):modal=='create_repuesto'?(
                            create_repuesto
                        ):modal=='create_accesorio'?(
                            create_accesorio
                        ):modal=='update_tasa_cambio'?(
                            <div className="component_new_item" >
                            <div>
                                <form>
                                    <h2>Actualizar Tasa</h2>
                                    <div>
                                        <label>{tasaCambio?tasaCambio.monto:null} bs</label>
                                        <input type="number" onChange={(e:any)=>{
                                                setTmpTasa({...tasaCambio,monto:e.target.value})
                                            }} />
                                    </div>

                                    <div>
                                        <button onClick={updateTasaCambio}>Actializar</button>
                                        <button onClick={() => setModal(false)} >cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div> 
                        ):null
                    }
                        
                    {/****************** Formulario para actualizar Tasa de Cambio ****************/}
                    <div className="container_admin_list_box">
                        <ul className="admin_list_box" >
                        <h3>Productos</h3>
                                {
                                    // Lista de productos
                                    productos.map((producto:Producto)=>{
                                        return(
                                            <li key={producto.nombre} onClick={()=>{setModal('manage_productos');setTmpProd(producto)}} >{producto.url}</li>
                                        )
                                    })
                                }
                        </ul>

                        <ul className="admin_list_box" >
                        <h3>Secciones</h3>
                                {
                                    // Lista de secciones
                                    secciones.map((seccion:Seccion)=>{
                                        return(
                                            <li key={seccion.title} onClick={()=>{setModal('manage_secciones');setTmpSecc(seccion)}} >{seccion.url}</li>
                                        )
                                    })
                                }
                        </ul>
                    </div>
                           
                </section>
                <style>{`
                        .admin_nav > li{
                            border-bottom:1px solid var(--font-color);
                            cursor:pointer;
                            padding:5px 0;
                        }
                        .container_admin_list_box{
                            display:grid;
                            grid-template-columns:1fr;
                        }
                        .admin_list_box{
                            max-height:700px;
                            overflow-y:auto;
                            overflow-x:hidden;
                            padding:5px ;
                            border-radius:3px;
                            background:var(--primary-color);
                            margin:10px;
                            display:grid;
                            grid-template-columns:repeat(2,1fr);
                            gap:5px;
                        }
                        .admin_list_box > h3{
                            grid-column:1 / span 2;
                            text-align:center;
                        }
                        .admin_list_box > li{
                            height:30px;
                            line-height:2;
                            overflow:hidden;
                            cursor:pointer;
                            box-shadow:0px 0px 1px var(--font-color);
                            padding:0 5px;
                        }
                        @media(min-width:512px){
                            .container_admin_list_box{
                                grid-template-columns:repeat(2,1fr);
                            }
                            
                        }
                        @media(min-width:800px){
                            .admin_list_box{
                                grid-template-columns:repeat(3,1fr);
                            }
                            .admin_list_box > h3{
                                grid-column:1 / span 3;
                            }
                        }
                        @media(min-width:1024px){
                            .admin_list_box{
                                grid-template-columns:repeat(2,1fr);
                            }
                            .admin_list_box > h3{
                                grid-column:1 / span 2;
                            }
                        }
                    `}
                </style>
            </main> ):null
}
export const getStaticProps:GetStaticProps = async(_:GetStaticPropsContext)=>{
    try{
        return {props:{
            secciones:[]
        },revalidate:1}
    }catch(err){
        console.log(err)
        return {props:{
            secciones:[]
        },revalidate:1}
    }
}
export default Cpanel