import { useContext, useEffect, useState, useMemo } from "react";
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import ProductsList from "../components/products.list";
import {GetStaticProps,GetStaticPropsContext} from 'next'
import Grid_similars_items from "../components/grid_similar_items";

const Accesorios = ({productos}:any) => {
    const { loaderCTRL, getAccesorios, accesorios}: any = useContext(GlobalAppContext)

    const [limit, setLimit] = useState<number>(12)

    const sidebar_memo = useMemo(() => <ProductsList productos={productos} />, [productos])

    const comp_accesorios = useMemo(() =>
        <Grid_similars_items items={accesorios.data} />
        , [accesorios])

    const moreAccesorios = () => {
        setLimit(limit + 12)
    }

    useEffect(() => {
        getAccesorios("", limit)
        loaderCTRL(document.location.pathname)
    }, [])

    return (
        <main>
            <Head>
                <title>Cellunatic - Accesorios</title>
            </Head>
            <aside>
                <h3>Filtrar busqueda</h3>
                {sidebar_memo}
            </aside>

            <section>
                <section>
                    <article>
                        <div className="container_items">
                            {comp_accesorios}
                        </div>
                        {accesorios.count > 12 ? <button onClick={moreAccesorios} >Mostrar más</button> : null}
                    </article>
                </section>
            </section>
        </main>
    )
}
export const getStaticProps:GetStaticProps = async (_:GetStaticPropsContext)=>{
    try{
        const res = await fetch(`${process.env.API}/productos/seccion/accesorios`)
    
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
export default Accesorios