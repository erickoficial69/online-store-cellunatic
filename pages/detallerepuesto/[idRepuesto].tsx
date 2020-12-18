import {useEffect,useState} from 'react'
import Template from "../../components/App";
import { Context, User } from '../../interfaces/interfaces'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { DetailsRepuesto } from "../../components/details.repuesto";
import { ManageRepuesto } from "../../components/manage.repuesto";

interface Props{
    context:Context
    idRepuesto:string
}

const Details=({context,idRepuesto}:Props)=>{
    const {setAppLoader,verifySesion, app, tasaCambio} = context
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
                    <ManageRepuesto id={idRepuesto} setAppLoader={setAppLoader} />
                ):(
                    <DetailsRepuesto tasaCambio={tasaCambio} app={app} id={idRepuesto} setAppLoader={setAppLoader} />
                )
            } 
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async(ctx:GetServerSidePropsContext)=>{
    const {query} = ctx
    console.log(query.idRepuesto)
    return {props:{
        idRepuesto:query.idRepuesto
    }}
}

export default Template(Details)