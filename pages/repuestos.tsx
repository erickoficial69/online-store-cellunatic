import { useContext, useEffect, useState, useMemo } from "react";
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import {GetStaticProps,GetStaticPropsContext} from 'next'
import Link from 'next/link'
import { Producto } from "../interfaces/interfaces";
import Grid_similars_items from "../components/grid_similar_items";

type Props={
    metas:Producto
    productos:Producto[]
}

const Repuestos=({productos,metas}:Props)=>{
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
            <title>Repuestos para computadoras y telefonos - Cellunatic</title>
            <meta name="description" content={metas.description} />
                <meta name="keywords" content={metas.keywords}/>
                <link rel="canonical" href={`https://online-store-cellunatic.vercel.app/${metas.url}`} />
                <meta property="og:locale" content="es_ES" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cellunatic" />
                <meta property="og:description" content={metas.description} />
                <meta property="og:url" content={`https://online-store-cellunatic.vercel.app/${metas.url}`} />
                <meta property="og:site_name" content="cellunatic.store" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:image:secure_url" content="/favicon.ico" />
                <meta property="og:image:width" content="32" />
                <meta property="og:image:height" content="32" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content={metas.description} />
                <meta name="twitter:title" content="Repuestos para computadoras y telefonos - Cellunatic" />
                <meta name="twitter:image" content="/favicon.ico" />
                <link rel="shortlink" href={`https://online-store-cellunatic.vercel.app/${metas.url}`} />
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

        const res_metas = await fetch(`${process.env.API}/sections/repuestos`)
        const metas = await res_metas.json()
        return {props:{
            productos,
            metas
        },revalidate:1}
    }catch(err){
        return {props:{
            productos:[],
            metas:{}
        },revalidate:1}
    }
}
export default Repuestos