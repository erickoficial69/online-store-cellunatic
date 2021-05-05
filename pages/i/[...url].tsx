import {useEffect,useState,useContext} from 'react'
import { Accesorio, Producto, User, Repuesto } from '../../interfaces/interfaces'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { verifySesion } from '../../components/controllers/usuarios.controllers';
import GlobalAppContext from '../../context/app/app_state';
import { DetailItem } from '../../components/details_item';
import { ManageAccesorio } from '../../components/manage.accesorio';
import { ManageRepuesto } from '../../components/manage.repuesto';
import Grid_similars_items from '../../components/grid_similar_items';

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
            <section className="full_width" >
                {
                    user.rango == "administrador" ?(
                        seccion=="accesorios"?(<ManageAccesorio accesorio={item}  />)
                        :seccion=="repuestos"?(<ManageRepuesto item={item}  />):null
                    ):(
                        <DetailItem item={item} />
                    )
                }
            </section>
            <section className="full_width">
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
                    }
                    .box_detail_item > section{
                        width:100%;
                        height:max-content;
                        position:relative;
                        border-radius:5px;
                        overflow:hidden;
                        background:var(--primary-color);
                        padding:5px;
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
                            grid-template-columns: 1fr 300px;
                        }
                        .box_detail_item > section > .container_details_item > div, .container_details_item > li{
                            grid-template-columns:repeat(2,1fr);
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