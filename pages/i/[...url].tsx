import {useEffect,useState,useContext} from 'react'
import { Accesorio, Producto, User, Repuesto } from '../../interfaces/interfaces'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { verifySesion } from '../../components/controllers/usuarios.controllers';
import GlobalAppContext from '../../context/app/app_state';
import { DetailItem } from '../../components/details_item';
import { ManageAccesorio } from '../../components/cpanel_components/manage.accesorio';
import { ManageRepuesto } from '../../components/cpanel_components/manage.repuesto';
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Grid_similars_items = dynamic(
  () => import('../../components/grid_similar_items'),
  { loading: () => <h1>Cargando Componente</h1> }
)

interface Props{
    item:Accesorio | Repuesto
    relacionados:Accesorio[] | Repuesto[]
    seccion:String
}

const Details=({item,relacionados,seccion}:Props)=>{
    const {loaderCTRL}:any = useContext(GlobalAppContext)
    const [user,setUser] = useState<User>({correo:'',password:''})

    useEffect(()=>{
        setUser(verifySesion())
        loaderCTRL(document.location.pathname)
    },[])

    return(
        <main>
            <Head>
                <title>{item.nombre} - Cellunatic</title>
                <meta name="description" content={item?item.description:""} />
                <meta name="keywords" content={item?item.keywords:""}/>
                <link rel="canonical" href={`https://online-store-cellunatic.vercel.app/${item?item.url:""}`} />
                <meta property="og:locale" content="es_ES" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cellunatic" />
                <meta property="og:description" content={item?item.description:""} />
                <meta property="og:url" content={`https://online-store-cellunatic.vercel.app/${item?item.url:""}`} />
                <meta property="og:site_name" content="cellunatic.store" />
                <meta property="og:image" content={item?item.imagenes.imagen1:'/logo512x512.png'} />
                <meta property="og:image:secure_url" content={item?item.imagenes.imagen1:'/logo512x512.png'} />
                <meta property="og:image:width" content="32" />
                <meta property="og:image:height" content="32" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content={item?item.description:""} />
                <meta name="twitter:title" content={`${item.nombre} - Cellunatic"`} />
                <meta name="twitter:image" content={item?item.imagenes.imagen1:'/logo512x512.png'} />
                <link rel="shortlink" href={`https://online-store-cellunatic.vercel.app/${item?item.url:""}`} />
            </Head>

            <section className="full_width" >
                {
                    user.rango == "administrador" ?(
                        seccion=="accesorios"?(<ManageAccesorio accesorio={item}  />)
                        :seccion=="repuestos"?(<ManageRepuesto item={item}  />):null
                    ):(
                        <DetailItem item={item} />
                    )
                }

                {
                    relacionados.length > 1?(
                    <>
                        <h2>
                            {item.producto.replace("-"," ")} más populares
                        </h2>
                        <div className="container_items">
                            <Grid_similars_items items={relacionados} />
                        </div>
                    </>
                        ):null
                }
            </section>

            <style jsx global >
                {
                    `
                    .box_detail_item{
                        display:grid;
                        grid-template-columns: 1fr;
                        gap:10px;
                        background:var(--primary-color);
                    }
                    .box_detail_item > section{
                        width:100%;
                        height:max-content;
                        position:relative;
                        border-radius:5px;
                        overflow:hidden;
                        padding:5px;
                    }
                    .box_detail_item > section:nth-child(2){
                        box-shadow:var(--shadow);
                    }
                    .box_detail_item > section > h1{
                        padding: 5px 2px;
                        font-size:22px;
                    }
                    .container_inputs_item{
                        width:100%;
                        display:grid;
                        grid-template-columns: repeat(3,1fr);
                        place-items: center;
                        place-content: center;
                        gap:5px;
                        z-index:2;
                    }
                    .container_img_item{
                        text-align:center;
                        width:100%;
                        height:250px;
                    }
                    .container_img_item > img{
                        width:100%;
                        height:100%;
                        object-fit:contain;
                    }
                    .container_inputs_item div{
                        text-align: center;
                        background:white;
                        box-shadow:var(--shadow);
                    }
                    .container_inputs_item img{
                        width:60px;
                        height:60px;
                        object-fit:contain;
                        cursor:pointer;
                    }
                    .box_detail_item input,.box_detail_item textarea,.box_detail_item select,.box_detail_item option{
                        width:100%;
                        padding:5px 3px;
                        background:var(--primary-color);
                        box-shadow:var(--shadow);
                        margin-bottom:5px;
                    }
                    .box_detail_item > section > .container_details_item > div, .container_details_item > li{
                        display:grid;
                        gap:10px;
                        grid-template-columns:1fr 150px;
                    }
                    @media(min-width:512px){
                        .box_detail_item > section > .container_details_item > div, .container_details_item > li{
                            grid-template-columns:1fr 250px;
                        }
                    }
                    @media(min-width:640px){
                        .container_img_item{
                            text-align:center;
                            height:300px;
                            padding-left:150px;
                        }
                        .container_inputs_item{
                            position:absolute;
                            width:150px;
                            top:0;
                            left:0;
                            grid-template-columns: 1fr;
                            place-items:unset;
                            place-content:unset;
                        }
                    }
                    @media(min-width:720px){
                        .box_detail_item{
                            grid-template-columns: 1fr 350px;
                        }
                        .box_detail_item > section > .container_details_item > div, .container_details_item > li{
                            grid-template-columns:1fr, 200px;
                        }
                        .container_details_item > li > b{
                           padding:10px 4px;
                           border-bottom:1px solid orange;
                           height:max-content;
                        }
                        .container_details_item > li > p{
                            align-self:center;
                        }
                    }
                    @media(min-width:1080px){
                        .box_detail_item{
                            grid-template-columns: 1fr 400px;
                        }
                    }
                    `
                }
            </style>
        </main>
    )
}
export const getServerSideProps:GetServerSideProps = async(context:GetServerSidePropsContext)=>{
    const {query} = context
    try{
        const req = await fetch(`${process.env.API}/productos/${query.url[1]}`)
        const res:Producto = await req.json()

        const req_data = await fetch(`${process.env.API}/${res.seccion}/detail/${query.url[0]}`)
        const data = await req_data.json()
        
        return { props: { 
            item:data.accesorio?data.accesorio:data.repuesto?data.repuesto:{},
            relacionados:data.relacionados?data.relacionados:[],
            seccion:res.seccion
        } }
    }catch(err){
        console.error(err)
        return { props: { item:{},relacionados:[],seccion:'' } }
    }
}

export default Details