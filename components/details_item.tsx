import { useState, useEffect, useContext } from 'react'
import { Accesorio, Repuesto } from '../interfaces/interfaces'
import Head from 'next/head'
import ModalCompra from './modal.compra'
import GlobalAppContext from '../context/app/app_state'

interface Props {
    item: Accesorio | Repuesto
}

export const DetailItem = ({ item }: Props) => {
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
    const { tasaCambio,  getTasaCambio }: any = useContext(GlobalAppContext)
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
        console.log(item)
        getTasaCambio()
        setPreviewImage(item.imagenes.imagen1)
    }, [item])

    return (
        <article className="box_detail_item">
            <Head>
                <title>{item.nombre}</title>
            </Head>
            <section>
                <div className="container_img_item">
                    <img loading="lazy" src={previewImage} alt={item.nombre} />
                </div>
                <div className="container_inputs_item">
                    <div style={{ position: 'relative', textAlign: 'center' }} >
                        <img loading="lazy" onClick={() => setPreviewImage(item.imagenes.imagen1)} src={item.imagenes.imagen1 ? item.imagenes.imagen1 : '/logo192x192.png'} alt={item.nombre+"_1"} />
                    </div>

                    <div style={{ position: 'relative', textAlign: 'center' }} >
                        <img loading="lazy" onClick={() => setPreviewImage(item.imagenes.imagen2)} src={item.imagenes.imagen2 ? item.imagenes.imagen2 : '/logo192x192.png'} alt={item.nombre+"_2"} />
                    </div>

                    <div style={{ position: 'relative', textAlign: 'center' }} >
                        <img loading="lazy" onClick={() => setPreviewImage(item.imagenes.imagen3)} src={item.imagenes.imagen3 ? item.imagenes.imagen3 : '/logo192x192.png'} alt={item.nombre+"_3"} />
                    </div>
                </div>
            </section>

            <section>
                <h1>{item.nombre}</h1>
                <ul className="container_details_item">
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
                <nav>
                    <button onClick={() => setModalBuy(true)} >Comprar</button>
                    
                        <button color="primary" onClick={() => {
                            const message = {
                                title: item.nombre,
                                text: `Tenemos las mejores ofertas en ${item.producto}`,
                                url: document.location.href
                            }
                            shareApi(message)
                        }} >Compartir</button>
                    
                </nav>
            </section>

            {/**Modal Compra */}

            {modalBuy ? <ModalCompra setModal={setModalBuy} /> : null}
        </article>
    )
}
