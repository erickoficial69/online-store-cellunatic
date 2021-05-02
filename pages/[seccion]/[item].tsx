import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Accesorio, Producto, Repuesto } from "../../interfaces/interfaces";
import * as accServ from '../../components/controllers/accesorios.controllers'
import * as repServ from '../../components/controllers/repuestos.controllers'
import Grid_similars_items from "../../components/grid_similar_items";
import { useContext, useEffect, useState } from "react";
import ProductsList from "../../components/products.list";
import GlobalAppContext from "../../context/app/app_state";

type Props={
    item:string
    seccion:string
    productos:Producto[]
}

const Index=({seccion,item,productos}:Props)=>{
    const {loaderCTRL}:any = useContext(GlobalAppContext)
    const [data,setData] = useState<Accesorio[] | Repuesto[]>([])

    const fecthData = async ()=>{
        
        if(seccion.toLowerCase() =='accesorios'){
            const {accesorios} = await accServ.getCustomAccesorio(item,10)
            setData(accesorios)
        }
        if(seccion.toLowerCase() =='repuestos'){
            const {repuestos} = await repServ.getCustomRepuesto(item,10)
            setData(repuestos)
        }

    }

    useEffect(()=>{
        fecthData()
        loaderCTRL(document.location.pathname)
    },[])

    return(
        <>
            <main>
                <aside>
                    <ProductsList productos={productos} />
                </aside>
                <section>
                    <div className="container_items">
                        <Grid_similars_items items={data} />
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
                item:producto.url
            }
        }))
        paths.push({params:{...paths.params, item:"all"}})
        return {paths,fallback:false}
    }catch(err){
        return {paths:[{params:{seccion:"/",item:"all"}}],fallback:false}
    }
    
}

export const getStaticProps:GetStaticProps = async({params}:GetStaticPropsContext)=>{
    const {seccion,item}:any = params
    try{
        const req = await fetch(`${process.env.API}/productos/seccion/${seccion}`)
        console.log(params)
        return {props:{
            seccion,
            item,
            productos:await req.json()
        },revalidate:1}
    }catch(err){
        return {props:{
            seccion:'/',
            items:'all',
            productos:[]
        },revalidate:1}
    }
}

export default Index