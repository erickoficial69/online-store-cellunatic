import {createContext, useEffect, useState} from 'react'
import { User, App, TasaCambio } from '../interfaces/interfaces'
const {Provider,Consumer} = createContext({})

const API:any = process.env.CELLUNATICBACKEND || 'http://localhost:3001'

const initialApp={
    name:'',
    description:'',
    addres:'',
    keywords:'',
    contact:{
        phone:'',
        whatsapp:'',
        email:'',
        instagram:'',
        facebook:'',
        telegram:'',
        twitter:''
    },
    logo:''
}

export default function ProviderApp ({children}:any){
    const [appLoader,setAppLoader] = useState(true)
    const [appLocation,setAppLocation] = useState('/')
    const [app,setApp] = useState<App>(initialApp)
    const [tasaCambio,setTasaCambio] = useState<TasaCambio>({monto:0})

    const verifySesion = ()=>{
        let user:User = {
            correo:'',
            password:''
        }
        if(localStorage.cellunatic){
            return JSON.parse(localStorage.cellunatic)
        }
        return user
    }
    const destroySesion = ()=>{
        let user:User = {
            correo:'',
            password:''
        }
        if(localStorage.cellunatic){
            localStorage.removeItem("cellunatic")
            return user
        }
        return
    }
    
    const getTasaCambio = async()=>{
        const req = await fetch(`${API}/app/tasacambio`)
        const tasa =  await req.json()
        setTasaCambio(tasa)
    }

    const getAppData = async()=>{
        const send = await fetch(`${API}/app`)
        const res = await send.json()
        setApp(res)
    }
    useEffect(()=>{
        window.addEventListener('hashchange',()=>{
            setAppLocation(document.location.pathname)
        })
        window.removeEventListener('hashchange',()=>{
            setAppLocation(document.location.pathname)
        })
        setAppLocation(document.location.pathname)
    },[])

    useEffect(()=>{
        getAppData()
        getTasaCambio()
    },[])
        
    return (
        <Provider value={{
            appLoader,setAppLoader,
            appLocation,setAppLocation,
            app,setApp,
            verifySesion,destroySesion,
            tasaCambio,setTasaCambio
        }} >
            {children}
        </Provider>
    )
}

export {Consumer}