import Head from 'next/head'
import { useEffect, useContext } from 'react'
import GlobalAppContext from '../context/app/app_state'
import {GetStaticProps,GetStaticPropsContext} from 'next'


const ServicioTecnico = () => {
    const { loaderCTRL }: any = useContext(GlobalAppContext)
    useEffect(() => {
        loaderCTRL(document.location.pathname)
    }, [])
    return (
        <main>
            <Head>
                <title>Cellunatic - servicio tectnico</title>
            </Head>
            <section className="full_width" >
                <section className="banner" style={{ position: 'relative', width: '100%', height: '100vh', maxHeight: "720px", display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
                    <img loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} src="/img/300.webp" alt="imagen servicio tecnico" />
                    <div style={{ width: '100%', height: '100%', position: 'absolute', background: 'rgba(0,0,0, .7)' }} ></div>

                    <h1 style={{ position: 'relative', textAlign: 'center' }}>Servicio Técnico Profesional</h1>
                    <p style={{ position: 'relative', textAlign: 'center', margin: '10px' }} >Solucion y detección de fallas en telefonia móvil, con la mejor atención porque...</p>
                    <p style={{ position: 'relative', textAlign: 'center', margin: '10px' }}><b>Somos gente que responde!</b></p>

                    <div style={{ position: 'absolute', bottom: 10, right: 0, left: 0, textAlign: 'center' }}>
                        <a href="#tag">
                            Ver más
                        </a>
                    </div>
                </section>
                <section id="tag" >
                    <article>
                        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }} >Servicio Técnico Hardware</h2>

                        <p >
                            Debido a que contamos con repuestos originales en stock, podemos asegurarte una rápida y
                            especializada atención, el precio de la reparación de su teléfono celular está directamente
                            ligado a la calidad de nuestros repuestos. Para ofrecerle la solución acorde a tu problema
                            ponete en contacto para una atención especializada. Algunas de las principales soluciones de
                            hardware para tu celular son:
                        </p>

                        <ol>
                            <li>
                                <p style={{ color: 'white' }}>Reparación de Display y Pantallas táctiles</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Problemas con el Cable Flex o Cámara</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Cambio de Micrófonos o Campanillas</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Problemas con el PIN de carga o Cambio de Batería</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Arreglo conectores USB y Soldado de Placas</p>
                            </li>

                            <li>
                                <p style={{ color: 'white' }}>Arreglo / Reemplazo de Parlantes</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Problemas con los Botones</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Solución a tu equipo Mojado</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>y mucho más, consultános.</p>
                            </li>
                        </ol>
                    </article>

                    <article>
                        <h2 style={{ textAlign: 'center', margin: '20px 0' }} >Servicio Técnico Software</h2>
                        <p>
                            Si tienes problemas con la funcionalidad o el sistema operativo de tu celular. Contamos con el
                            Software necesario para realizar cualquier arreglo, dejando la funcionalidad del celular
                            operable al 100%. Algunas de las principales Soluciones de Software para tu celular son:
                        </p>

                        <ol>
                            <li>
                                <p style={{ color: 'white' }}>Downgrade, Actualización y Flasheo de Software o Firmware.</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Configuración o Instalación de Aplicaciones, GPS, Utilidades y Juegos.</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Configuramos tu celular para un correcto.</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Reinstalación del sistema operativo.</p>
                            </li>
                            <li>
                                <p style={{ color: 'white' }}>Arreglo conectores USB y Soldado de Placas</p>
                            </li>
                        </ol>

                        <p>
                            Liberación y desbloqueo de tu teléfono celular, realizado tanto por Software como por Código,
                            no comprometemos el teléfono.
                        </p>
                    </article>
                </section>
            </section>
        </main>
    )
}

export const getStaticProps:GetStaticProps = async(_:GetStaticPropsContext)=>{
    return {props:{},revalidate:1}
}

export default ServicioTecnico