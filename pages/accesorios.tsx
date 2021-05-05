import { useContext, useEffect, useMemo } from "react";
import Head from "next/head";
import GlobalAppContext from "../context/app/app_state";
import ProductsList from "../components/products.list";
import {GetStaticProps,GetStaticPropsContext} from 'next'

const Accesorios = ({productos}:any) => {
    const { loaderCTRL }: any = useContext(GlobalAppContext)

    const sidebar_memo = useMemo(() => <ProductsList productos={productos} />, [productos])

    useEffect(() => {
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
                    <h1>Los mejores accesorios para Celulares</h1>
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