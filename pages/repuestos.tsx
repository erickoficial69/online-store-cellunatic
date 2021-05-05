import { useContext, useEffect, useMemo } from "react";
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import {GetStaticProps,GetStaticPropsContext} from 'next'
import { Producto } from "../interfaces/interfaces";
import ProductsList from "../components/products.list";

type Props={
    metas:Producto
    productos:Producto[]
}

const Repuestos=({productos,metas}:Props)=>{
    const {loaderCTRL}:any = useContext(GlobalAppContext)
    const sidebar_memo = useMemo(() => <ProductsList productos={productos} />, [productos])
    useEffect(()=>{
        loaderCTRL(document.location.pathname)
    },[])


    return(
        <main>
            <Head>
            <title>Repuestos para computadoras y telefonos - Cellunatic</title>
            <meta name="description" content={metas?metas.description:""} />
                <meta name="keywords" content={metas?metas.keywords:""}/>
                <link rel="canonical" href={`https://online-store-cellunatic.vercel.app/${metas?metas.url:"repuestos"}`} />
                <meta property="og:locale" content="es_ES" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cellunatic" />
                <meta property="og:description" content={metas?metas.description:""} />
                <meta property="og:url" content={`https://online-store-cellunatic.vercel.app/${metas?metas.url:"/repuestos"}`} />
                <meta property="og:site_name" content="cellunatic.store" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:image:secure_url" content="/favicon.ico" />
                <meta property="og:image:width" content="32" />
                <meta property="og:image:height" content="32" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content={metas?metas.description:""} />
                <meta name="twitter:title" content="Repuestos para computadoras y telefonos - Cellunatic" />
                <meta name="twitter:image" content="/favicon.ico" />
                <link rel="shortlink" href={`https://online-store-cellunatic.vercel.app/${metas?metas.url:"/repuestos"}`} />
            </Head>
               
            <aside>
                <h3>Filtrar busqueda</h3>
                {sidebar_memo}
            </aside>

            <section> 
            <h1>Los mejores accesorios para Celulares</h1>
                    <p>
                        La venta Smartphones sigue creciendo tanto en nuestro país
                        como en todo el planeta. 
                        <br/>
                        Los problemas de los teléfonos móviles a veces pueden parecer los más invasivos y las
                        soluciones no siempre son fáciles de encontrar. Dependemos de nuestros teléfonos
                        móviles cada vez más cada día, así que cuando nos encontramos con dificultades con
                        ellos y tenemos que llevarlos a algún lugar para arreglarlos, puede ser un verdadero
                        dolor. Afortunadamente, tenemos para ti una variedad de repuestos y servicio tecnico profesional para cada caso.
                    </p>
                    <article>
                        <h3>La batería no funciona</h3>
                        <p>
                            ¿Cómo puedes usar tu teléfono si no se mantiene vivo el tiempo suficiente?
                            Los
                            <b>problemas de batería son una de las fallas más comunes en los teléfonos</b>,
                            generalmente causados por el abuso del usuario.
                        </p>
                    </article>

                    <article>
                        <h3>Pantalla está rota</h3>
                        <p>
                            Como las pantallas de nuestros teléfonos son de vidrio, no es sorprendente que a veces un fuerte impacto con el suelo pueda hacer que se rompan. Las grietas pueden
                            causar problemas en la respuesta de la pantalla táctil o dejar entrar la humedad, por lo que es importante reparar el teléfono después de que la pantalla se
                            dañe.
                        </p>
                    </article>

                    <article>
                        <h3>Teléfono no carga (El puerto de carga dejó de funcionar)</h3>
                        <p>
                            Al igual que con las baterías de los teléfonos, con el tiempo los cables de carga y el
                            puerto se desgastarán. En el teléfono, las pequeñas lengüetas metálicas alrededor de
                            la abertura donde enchufas el cargador pueden dañarse o ensuciarse, lo que puede
                            complicar o ralentizar su capacidad de carga.
                        </p>
                    </article>
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