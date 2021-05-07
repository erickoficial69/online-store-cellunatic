import { useContext, useEffect, useMemo } from "react";
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import ProductsList from "../components/products.list";
import {GetStaticProps,GetStaticPropsContext} from 'next'
import { Producto } from "../interfaces/interfaces";

type Props={
    metas:Producto
    productos:Producto[]
}
const Accesorios = ({productos,metas}:Props) => {
    const { loaderCTRL }: any = useContext(GlobalAppContext)

    const sidebar_memo = useMemo(() => <ProductsList productos={productos} seccion={metas.url?metas.url:''} />, [productos])

    useEffect(() => {
        loaderCTRL(document.location.pathname)
    }, [])

    return (
        <main>
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
            <aside>
                <h3>Filtrar busqueda</h3>
                {sidebar_memo}
            </aside>

            <section>
                <section>
                    <h1>Los mejores accesorios para Celulares </h1>
                    <p>
                        La venta Smartphones sigue creciendo tanto en nuestro país
                        como en todo el planeta. 
                        <br/>
                        Es casi imprescindible contar con alguno de estos
                        complementos para poder disfrutar aún más de nuestro
                        móvil e incluso potenciar el uso del mismo con este tipo de
                        artículos. Cellunatic hace un repaso de los accesorios
                        más comprados, populares e innovadores del momento.
                    </p>
                    <article>
                        <h3>Cable USB y Cargador</h3>
                        <p>
                            son productos muy
                            importantes. Existen cargadores que se enchufan mediante el
                            encendedor del auto o vía USB al estéreo para salir de algún
                            apuro y darle una carga rápida al dispositivo. Son muy útiles
                            cuando se va a realizar un viaje largo.
                        </p>
                    </article>

                    <article>
                        <h3>Vidrio templado o protectores de pantalla</h3>
                        <p>
                            Estas delgadas láminas cubren y cuidan la pantalla de
                            nuestro teléfono contra los rayones. Existe una nueva
                            tecnología en estos lms llamados Gorilla Glass que es una
                            pequeña capa de vidrio que se coloca sobre la pantalla para
                            protegerla de los daños exteriores que podrían originarse.
                        </p>
                    </article>

                    <article>
                        <h3>Auriculares</h3>
                        <p>
                            Son artículos muy usados. Tienen un alto
                            nivel de ventas.También son muy
                            personales tenemos variedad segun la calidad de sonido y marcas,
                            por lo que es recomendable comprar
                            distintos audífonos y no utilizar los estándar que vienen
                            incluidos cuando comprás un celular.
                        </p>
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

        const res_metas = await fetch(`${process.env.API}/sections/accesorios`)
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
export default Accesorios