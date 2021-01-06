import App,{AppProps,AppContext} from "next/app";
import {useEffect,useState} from 'react'
import { User, AppData, TasaCambio } from '../interfaces/interfaces'

const API:any = process.env.API || 'https://cellunaticbackend.herokuapp.com' 

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

function Myapp({ Component,pageProps}:AppProps) {

  const [appLoader,setAppLoader] = useState(true)
  const [appLocation,setAppLocation] = useState('/')
  const [appData,setAppData] = useState<AppData>(initialApp)
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
      setAppData(res)
  }
  useEffect(()=>{
      setAppLocation(document.location.pathname)
      window.addEventListener('hashchange',()=>{
          setAppLocation(document.location.pathname)
      })
      window.removeEventListener('hashchange',()=>{
          setAppLocation(document.location.pathname)
      })
  },[])

  useEffect(()=>{
    getAppData()
    getTasaCambio()
  },[])

  return <Component {...pageProps} context={{
      appLoader,setAppLoader,
      appLocation,setAppLocation,
      appData,setAppData,
      verifySesion,destroySesion,
      tasaCambio,setTasaCambio
}} />
}

Myapp.getInitialProps = async(ctx:AppContext)=>{
    const appProps = await App.getInitialProps(ctx)
      return {appProps}
}

export default Myapp