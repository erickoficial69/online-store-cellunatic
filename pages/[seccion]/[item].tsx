import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Accesorio, Producto, Repuesto } from "../../interfaces/interfaces";
import * as accServ from '../../components/controllers/accesorios.controllers'
import * as repServ from '../../components/controllers/repuestos.controllers'
import { useContext, useEffect, useMemo, useState } from "react";
import GlobalAppContext from "../../context/app/app_state";
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Grid_similars_items = dynamic(
  () => import('../../components/grid_similar_items'),
  { loading: () => <h1>Cargando Componente</h1> }
)

const ProductsList = dynamic(
  () => import('../../components/products.list'),
  { loading: () => <h1>Cargando Componente</h1> }
)

type Props={
    item:string
    seccion:string
    productos:Producto[]
    metas:Producto
}

const Index=({seccion,item,productos,metas}:Props)=>{
    const {loaderCTRL,setBuscador}:any = useContext(GlobalAppContext)
    const [data,setData] = useState<Accesorio[] | Repuesto[]>([])
    const [limit,setLimit] = useState<number>(10)
    const fecthData = async (item:string,limit:number)=>{
        
        if(seccion.toLowerCase() =='accesorios'){
            const {accesorios} = await accServ.getCustomAccesorio(item,limit)
            setData(accesorios)
        }
        if(seccion.toLowerCase() =='repuestos'){
            const {repuestos} = await repServ.getCustomRepuesto(item,limit)
            setData(repuestos)
        }

    }
    const grid_items = useMemo(()=><Grid_similars_items items={data} />,[data])
    const sidebar_memo = useMemo(() => <ProductsList productos={productos} seccion={metas.seccion} />, [])
   
    useEffect(()=>{
        setLimit(10)
        setBuscador({activo:true,handler:fecthData})
        fecthData(item,limit)
        loaderCTRL(document.location.pathname)
    },[item])

    return(
        <>
            <Head>
                <title>Accesorios para computadoras y telefonos - Cellunatic</title>
                <meta name="description" content={metas?metas.description:""} />
                <meta name="keywords" content={metas?metas.keywords:""}/>
                <link rel="canonical" href={`https://online-store-cellunatic.vercel.app/${metas?metas.url:"/accesorios"}`} />
                <meta property="og:locale" content="es_ES" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cellunatic" />
                <meta property="og:description" content={metas?metas.description:""} />
                <meta property="og:url" content={`https://online-store-cellunatic.vercel.app/${metas?metas.url:"/accesorios"}`} />
                <meta property="og:site_name" content="cellunatic.store" />
                <meta property="og:image" content="https://online-store-cellunatic.vercel.app/logo512x512.png" />
                <meta property="og:image:secure_url" content="https://online-store-cellunatic.vercel.app/logo512x512.png" />
                <meta property="og:image:width" content="32" />
                <meta property="og:image:height" content="32" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content={metas?metas.description:""} />
                <meta name="twitter:title" content="Accesorios para computadoras y telefonos - Cellunatic" />
                <meta name="twitter:image" content="https://online-store-cellunatic.vercel.app/logo512x512.png" />
                <link rel="shortlink" href={`https://online-store-cellunatic.vercel.app/${metas?metas.url:"/accesorios"}`} />
            </Head>
            <main>
                <aside>
                    <h3>Filtrar busqueda</h3>
                    {sidebar_memo} 
                </aside>
                <section>
                    <div className="container_items">
                        {grid_items}
                    </div>
                </section>
            </main>
        </>
    )
}
export const getStaticPaths:GetStaticPaths = async()=>{
    try{
        const req = await fetch(`${process.env.API}/productos/`)
        const res = await req.json()
        const paths = res.map((producto:Producto)=>({
            params:{
                seccion:producto.seccion,
                item:producto.url?producto.url:'all'
            }
        }))
        return {paths,fallback:false}
    }catch(err){
        return {paths:[{params:{seccion:"/",item:"all"}}],fallback:false}
    }
    
}

export const getStaticProps:GetStaticProps = async({params}:GetStaticPropsContext)=>{
    const {seccion,item}:any = params
    try{
        const req = await fetch(`${process.env.API}/productos/seccion/${seccion}`)
        const res_metas = await fetch(`${process.env.API}/productos/${item}`)
        const metas = await res_metas.json()
        return {props:{
            seccion,
            item,
            metas,
            productos:await req.json()
        },revalidate:1}
    }catch(err){
        return {props:{
            seccion:'/',
            items:'all',
            metas:{},
            productos:[]
        },revalidate:1}
    }
}

export default Index