import { useState, useEffect, useContext } from 'react'
import { Accesorio, Repuesto } from '../interfaces/interfaces'
import Head from 'next/head'
import ModalCompra from './modal.compra'
import GlobalAppContext from '../context/app/app_state'
import Grid_similars_items from './grid_similar_items'

interface Props {
    item: Accesorio | Repuesto
    relacionados: Accesorio[] | Repuesto[]
}

export const DetailItem = ({ item, relacionados }: Props) => {
    const initialState = {
        nombre: '',
        color: '',
        estado: false,
        imagenes: {
            imagen1: '/logo192x192.png',
            imagen2: '/logo192x192.png',
            imagen3: '/logo192x192.png'
        },
        modelo: '',
        precio: 0,
        producto: ''
    }
    const { tasaCambio, loaderCTRL }: any = useContext(GlobalAppContext)
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialState.imagenes.imagen1)
    
    const [modalBuy, setModalBuy] = useState<boolean>(false)

    const shareApi = async (message: any) => {

        try {
            await navigator.share(message)
        } catch (err) {
            var aux = document.createElement("input");

            // Asigna el contenido del elemento especificado al valor del campo
            aux.setAttribute("value", document.location.href);

            // Añade el campo a la página
            document.body.appendChild(aux);

            // Selecciona el contenido del campo
            aux.select();

            // Copia el texto seleccionado
            document.execCommand("copy");

            // Elimina el campo de la página
            document.body.removeChild(aux);
            alert('Enlace copiado al portapapeles')
        }
    }

  
    useEffect(() => {
        setPreviewImage(item.imagenes.imagen1)
        loaderCTRL(false)
    }, [item])

    return (
        <>
            <Head>
                <title>{item.nombre}</title>
            </Head>

                    <h1>{item.nombre}</h1>


                    <div style={{
                        borderRadius: '5px',
                        boxShadow: '0px 0px 1px black',
                        height: '300px',
                        background: 'white',
                        overflow: 'hidden',
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }} >

                        <img style={{ height: "90%", width: "90%", objectFit: "contain", position: 'relative' }}
                            src={previewImage}
                            alt={item.nombre + " imagen"} />

                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, background: 'rgba(5,5,5,.5)' }}>
                            <div style={{ position: 'relative', textAlign: 'center' }} >
                                <img onClick={() => setPreviewImage(item.imagenes.imagen1)} style={{ height: "60px", width: "60px", margin: '0 auto', objectFit: "contain", position: 'relative' }} src={item.imagenes.imagen1 ? item.imagenes.imagen1 : '/logo192x192.png'} alt={item.producto} />
                            </div>

                            <div style={{ position: 'relative', textAlign: 'center' }} >
                                <img onClick={() => setPreviewImage(item.imagenes.imagen2)} style={{ height: "60px", width: "60px", margin: '0 auto', objectFit: "contain", position: 'relative' }} src={item.imagenes.imagen2 ? item.imagenes.imagen2 : '/logo192x192.png'} alt={item.producto} />
                            </div>

                            <div style={{ position: 'relative', textAlign: 'center' }} >
                                <img onClick={() => setPreviewImage(item.imagenes.imagen3)} style={{ height: "60px", width: "60px", margin: '0 auto', objectFit: "contain", position: 'relative' }} src={item.imagenes.imagen3 ? item.imagenes.imagen3 : '/logo192x192.png'} alt={item.producto} />
                            </div>
                        </div>
                    </div>


                    <ul>
                        {item.color !== "" ? (
                            <li>
                                <p>Color:</p>
                                <p>{item.color}</p>
                            </li>
                        ) : null}
                        <li style={{ color: 'white' }} >
                            <p>Producto:</p>
                            <p>{item.producto}</p>
                        </li>
                        {
                            item.modelo !== "" ? (
                                <li style={{ color: 'white' }} >
                                    <p>Modelo:</p>
                                    <p>{item.modelo}</p>
                                </li>
                            ) : null
                        }
                        <li style={{ color: 'white' }} >
                            <p>Estado:</p>
                            <p>{item.estado ? "disponible" : "agotado"}</p>
                        </li>
                        <li style={{ color: 'white' }} >
                            <p>Precio:</p>
                            <p>{item.precio} $ / {item.precio * tasaCambio.monto} bs</p>
                        </li>
                    </ul>
                    {/** Acciones para este producto */}
                    <li>
                        <button onClick={() => setModalBuy(true)} >Comprar</button>
                        <li>
                            <button color="primary" onClick={() => {
                                const message = {
                                    title: item.nombre,
                                    text: `Tenemos las mejores ofertas en ${item.producto}`,
                                    url: document.location.href
                                }
                                shareApi(message)
                            }} >Compartir</button>
                        </li>
                    </li>

                    <br /><br />
                    <h2>
                        {item.producto} más populares
                    </h2>
                    <div className="container_items">
                        <Grid_similars_items items={relacionados} />
                    </div>

                    {/**Modal Compra */}

                    {modalBuy ? <ModalCompra setModal={setModalBuy} /> : null}
        </>
    )
}
