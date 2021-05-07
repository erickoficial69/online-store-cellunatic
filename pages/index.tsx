import { useEffect, useContext, useMemo, useState } from "react";
import Link from 'next/link'
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Grid_similars_items from "../components/grid_similar_items";

const Index = ({sections}:any) => {
    const { loaderCTRL, getAccesorios, accesorios, repuestos, getRepuestos }: any = useContext(GlobalAppContext)
    const [limit,setLimit] = useState(3)
    const comp_accesorios = useMemo(() =>
        <Grid_similars_items items={accesorios.data} />
        , [accesorios,limit])
    const comp_repuestos = useMemo(() =>
        <Grid_similars_items items={repuestos.data} />
        , [repuestos,limit])
   
    useEffect(() => {
        setLimit(3)
        getAccesorios("", limit)
        getRepuestos("",limit)
        loaderCTRL(document.location.pathname)
    }, [])

    return (
        <main>
            <Head>
                <title>Cellunatic</title>
                <meta name="description" content="Cellunatic, tienda de accesorios, repuestos y servicio técnico profesional en dispositivos móviles, computadores y laptops" />
                <meta name="keywords" content="cellunatic, servicio tecnico a domicilio carabobo, servicio tecnico domicilio valencia, repuestos para telefonos, accesorios para telefonos"/>
                <link rel="canonical" href="https://online-store-cellunatic.vercel.app/" />
                <meta property="og:locale" content="es_ES" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cellunatic" />
                <meta property="og:description" content="Cellunatic, tienda de accesorios, repuestos y servicio técnico profesional en dispositivos móviles, computadores y laptops" />
                <meta property="og:url" content="https://online-store-cellunatic.vercel.app/" />
                <meta property="og:site_name" content="cellunatic.store" />
                <meta property="og:image" content="https://online-store-cellunatic.vercel.app/logo512x512.png" />
                <meta property="og:image:secure_url" content="https://online-store-cellunatic.vercel.app/logo512x512.png" />
                <meta property="og:image:width" content="32" />
                <meta property="og:image:height" content="32" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content="Cellunatic, tienda de accesorios, repuestos y servicio técnico profesional en dispositivos móviles, computadores y laptops" />
                <meta name="twitter:title" content="Cellunatic" />
                <meta name="twitter:image" content="https://online-store-cellunatic.vercel.app/logo512x512.png" />
                <link rel="shortlink" href="https://online-store-cellunatic.vercel.app/" />


            </Head>
            <section className="full_width" style={{background:'transparent'}} >
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
                               Es casi imprescindible contar con alguno de estos
                                complementos para poder disfrutar aún más de nuestro
                                móvil e incluso potenciar el uso del mismo con este tipo de
                                artículos. Cellunatic hace un repaso de los accesorios
                                más comprados, populares e innovadores del momento.
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
                            <h2>Los repuestos mas vendidos en Cellunatic</h2>
                            <p>
                                Estos son algunos de los repuestos más adquiridos por nuestros visitantes, podras encontrar forros, vidrios templados, audifonos y mucho más.
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
        const req = await fetch(`${process.env.API}/sections`)
        const res = await req.json()
        return {props:{
            sections:res
        },revalidate:1}
    }catch(err){
        console.error(err)
        return {props:{
            sections:[]
        },revalidate:1}
    }
}
export default Index