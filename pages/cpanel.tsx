import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Producto, Seccion, User } from '../interfaces/interfaces'
import * as userServ from '../components/controllers/usuarios.controllers'
import * as seccServ from '../components/controllers/secciones.controllers'
import GlobalAppContext from '../context/app/app_state'
import {ManageProduct} from '../components/cpanel_components/manage_producto'
import { ManageSection } from '../components/cpanel_components/manage_sections'
import { CreateAccesorio } from '../components/cpanel_components/create_accesorio'
import { CreateRepuesto } from '../components/cpanel_components/create_repuesto'
import { List_products_admin, List_Sections_Admin } from '../components/cpanel_components/Lists'
import { Admin_menu } from '../components/cpanel_components/Admin_menu'
import { Manage_Tasa_Cambio } from '../components/cpanel_components/Manage_tasa_cambio'

const Cpanel = () => {
    const { push } = useRouter()
    const { loaderCTRL, tasaCambio, productos, getProductos, getTasaCambio }:any = useContext(GlobalAppContext)
    const [user, setUser] = useState<User>({ correo: '', password: '' })
    const [tmpSecc,setTmpSecc] = useState<Seccion>({title:''})
    const [tmpProd,setTmpProd] = useState<Producto>({nombre:'',estado:false,seccion:''})
    const [modal,setModal] = useState<string | boolean>(false)
    const [secciones,setSecciones] = useState<Seccion[]>([{title:''}])
    
    const manage_section = useMemo(()=><ManageSection setSecciones={setSecciones} seccion={tmpSecc} setTmpSecc={setTmpSecc} setModal={setModal}/>,[tmpSecc])
    const create_repuesto = useMemo(()=><CreateRepuesto setModal={setModal}/>,[])
    const create_accesorio = useMemo(()=><CreateAccesorio setModal={setModal}/>,[])
    const manage_producto = useMemo(()=><ManageProduct producto={tmpProd} setTmpProd={setTmpProd} setModal={setModal}/>,[tmpProd])
    const list_sections = useMemo(()=><List_Sections_Admin secciones={secciones} setTmpSecc={setTmpSecc} setModal={setModal}/>,[secciones])
    const list_products = useMemo(()=><List_products_admin productos={productos.data} setTmpProd={setTmpProd} setModal={setModal}/>,[productos])
    const admin_menu = useMemo(()=><Admin_menu tasaCambio={tasaCambio} setModal={setModal} />,[tasaCambio])
    const manage_tasa_cambio = useMemo(()=><Manage_Tasa_Cambio setModal={setModal}/>,[])
    
    useEffect(() => {
        const result = userServ.verifySesion()
        if (result.correo === "") push('/login')

        setUser(result)
    }, [])
    const tasa = useCallback(()=>{
        getTasaCambio()
    },[tasaCambio])

    useEffect(()=>{
        (async()=>{
            setSecciones(await seccServ.getSecciones())
            tasa()
            getProductos() 
            loaderCTRL(document.location.pathname)   
        })()
    },[])

    return user.rango && user.rango === "administrador" ? (
                <main>
                <Head>
                    <title>Cellunatic - cpanel</title>
                </Head>
                <section className="full_width" >
                    <ul>
                        <h3>Dashboard</h3>
                        {admin_menu}
                    </ul>
                    
                
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
                            manage_tasa_cambio
                        ):null
                    }
                        
                    {/****************** Formulario para actualizar Tasa de Cambio ****************/}
                    <div className="container_admin_list_box">
                        {list_sections}
                        {list_products}
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

export default Cpanel