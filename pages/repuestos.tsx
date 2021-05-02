import { useContext, useEffect, useState, useMemo } from "react";
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import {GetStaticProps,GetStaticPropsContext} from 'next'
import Link from 'next/link'
import { Producto } from "../interfaces/interfaces";
import Grid_similars_items from "../components/grid_similar_items";

const Repuestos=({productos}:any)=>{
    const {getRepuestos,repuestos,loaderCTRL}:any = useContext(GlobalAppContext)
    
    const [limit,setLimit] = useState<number>(12)

    const comp_repuestos = useMemo(()=><Grid_similars_items items={repuestos.data} />,[repuestos])
    const moreRepuestos=()=>{
        setLimit(limit+12)
    }

    useEffect(()=>{
        getRepuestos("",limit)
        loaderCTRL(document.location.pathname)
    },[])


    return(
        <main>
            <Head>
                <title>Cellunatic - repuestos</title>
            </Head>
               
            <aside>
                <h3>Filtrar busqueda</h3>
                <ul className="admin_list_box" >
                    {
                        // Lista de productos
                        productos.map((producto:Producto)=>{
                            return(
                                <Link key={producto._id} href={`/${producto.seccion}/${producto.url}`} ><li>{producto.nombre}</li></Link>
                            )
                        })
                    }
                </ul>
            </aside>

            <section> 
                <div className="container_items">
                    {comp_repuestos}
                </div>

                {repuestos.length>12?<button onClick={moreRepuestos} >Mostrar más</button>:null}
            </section> 
        </main>
    )
}
export const getStaticProps:GetStaticProps = async (_:GetStaticPropsContext)=>{
    try{
        const res = await fetch(`${process.env.API}/productos/seccion/repuestos`)
    
        const productos = await res.json()
        return {props:{
            productos
        },revalidate:1}
    }catch(err){
        return {props:{
            productos:[]
        },revalidate:1}
    }
}
export default Repuestos