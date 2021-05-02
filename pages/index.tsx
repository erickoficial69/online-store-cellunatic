import { useEffect, useContext, useMemo } from "react";
import Link from 'next/link'
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Grid_similars_items from "../components/grid_similar_items";

const Index = ({sections}:any) => {
    const { loaderCTRL, getAccesorios, accesorios, repuestos, getRepuestos }: any = useContext(GlobalAppContext)

    const comp_accesorios = useMemo(() =>
        <Grid_similars_items items={accesorios.data} />
        , [accesorios])
    const comp_repuestos = useMemo(() =>
        <Grid_similars_items items={repuestos.data} />
        , [repuestos])
   
    useEffect(() => {
        getAccesorios("", 3)
        getRepuestos("",3)
        loaderCTRL(document.location.pathname)
    }, [])

    return (
        <main>
            <Head>
                <title>home</title>
                <meta name="description" content="la misma puta desc" />
                <link rel="canonical" href="https://cellunatic.store/" />
                <meta property="og:locale" content="es_ES" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="el mismo puto titulo" />
                <meta property="og:description" content="la misma puta desc" />
                <meta property="og:url" content="https://cellunatic.store/" />
                <meta property="og:site_name" content="cellunatic.store" />
                <meta property="og:image" content="https://la-misma-imagen.jpg" />
                <meta property="og:image:secure_url" content="https://la-misma-imagen.jpg" />
                <meta property="og:image:width" content="900" />
                <meta property="og:image:height" content="432" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content="la misma puta desc" />
                <meta name="twitter:title" content="el mismo puto titulo" />
                <meta name="twitter:image" content="https://la-misma-imagen.jpg" />
                <link rel="shortlink" href="https://cellunatic.store/" />


            </Head>
            <section className="full_width" >
                <section>
                    <article className="intro" >

                        <img loading="lazy" src="/logo192x192.png" alt="Cellunatic logo" />

                        <div>
                            <h1 className="coursive" >Cellunatic 2017 CG C.A</h1>
                            <p >Gente que Responde!</p>
                        </div>

                        <nav className="botonera" style={{ width: '100%', textAlign: 'center' }} >
                            {sections?.map((seccion:any)=><Link key={seccion.title} href={`/${seccion.url}`} ><a onClick={()=>loaderCTRL(`/${seccion.url}`)} ><button>{seccion.title}</button></a></Link>
                            )}
                        </nav>
                    </article>
                </section>

                {accesorios.count > 0 ?
                    <section>
                        <article>
                            <h2>Los accesorios mas populares en Cellunatic</h2>
                            <p>
                                Estos son algunos de los accesorios más populares de nuestros visitantes, podras encontrar forros, vidrios templados, audifonos y mucho más.
                            </p>

                            <ul className="container_items">
                                {comp_accesorios}
                            </ul>

                            <footer>
                                <Link href="/accesorios" >
                                    <button onClick={()=>loaderCTRL('/accesorios')}>Ver mas accesorios</button>
                                </Link>
                            </footer>
                        </article>
                    </section>
                    : null}
                {repuestos.data.length > 0 ?
                    <section>
                        <article>
                            <h2>Los repuestos mas populares en Cellunatic</h2>
                            <p>
                                Estos son algunos de los repuestos más populares de nuestros visitantes, podras encontrar forros, vidrios templados, audifonos y mucho más.
                            </p>

                            <ul className="container_items" >
                                {comp_repuestos}
                            </ul>

                            <footer>
                                <Link href="/repuestos" >
                                    <button onClick={()=>loaderCTRL('/repuestos')}>Ver mas repuestos</button>
                                </Link>
                            </footer>
                        </article>
                    </section>
                    : null}
            </section>
        </main>
    )
}
export const getStaticProps:GetStaticProps = async (_:GetStaticPropsContext)=>{
    try{
        const req = await fetch('http://localhost:4000/sections')
        const res = await req.json()
        return {props:{
            sections:res
        },revalidate:1}
    }catch(err){
        console.log(err)
        return {props:{
            sections:[]
        },revalidate:1}
    }
}
export default Index