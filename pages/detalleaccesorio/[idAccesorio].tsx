import {useEffect,useState} from 'react'
import Template from "../../components/App";
import { Context, User } from '../../interfaces/interfaces'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { DetailsAccesorio } from "../../components/details.accesorio";
import { ManageAccesorio } from "../../components/manage.accesorio";

interface Props{
    context:Context
    idAccesorio:string
}

const Details=({context,idAccesorio}:Props)=>{
    const {setAppLoader,verifySesion, appData, tasaCambio} = context
    const [user,setUser] = useState<User>({correo:'',password:''})

    useEffect(()=>{
        const sesion = verifySesion()
        setUser(sesion)
    },[])

    return(
        <>
                <hr style={{marginBottom:'90px'}} ></hr>
            {
                 user.rango && user.rango === "administrador" ? (
                    <ManageAccesorio id={idAccesorio} setAppLoader={setAppLoader} />
                ):(
                    <DetailsAccesorio tasaCambio={tasaCambio} app={appData} id={idAccesorio} setAppLoader={setAppLoader} />
                )
            } 
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async(ctx:GetServerSidePropsContext)=>{
    const {query} = ctx
    return {props:{
        idAccesorio:query.idAccesorio
    }}
}

export default Template(Details)