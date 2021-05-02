import {useEffect,useState,useContext} from 'react'
import { Accesorio, Producto, User, Repuesto } from '../../interfaces/interfaces'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { verifySesion } from '../../components/controllers/usuarios.controllers';
import GlobalAppContext from '../../context/app/app_state';
import { DetailItem } from '../../components/details_item';
import { ManageAccesorio } from '../../components/manage.accesorio';
import { ManageRepuesto } from '../../components/manage.repuesto';

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
                        <DetailItem item={item} relacionados={relacionados} />
                    )
                }
            </section>
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
        console.log(data)
        return { props: { 
            item:data.accesorio?data.accesorio:data.repuesto?data.repuesto:{},
            relacionados:data.relacionados?data.relacionados:[],
            seccion:res.seccion
        } }
    }catch(err){
        return { props: { item:{},relacionados:[],seccion:'' } }
    }
}

export default Details