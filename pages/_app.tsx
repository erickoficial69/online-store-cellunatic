import {AppProps} from "next/app";
import Head from 'next/head'
import {useReducer,Reducer, ReducerAction, useState} from 'react'
import GlobalAppContext,{initialApp} from "../context/app/app_state";
import appReducer from '../context/app/app_reducer'
import { AppData } from '../interfaces/interfaces'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./index.css"
import * as accServ from '../components/controllers/accesorios.controllers'
import * as repServ from '../components/controllers/repuestos.controllers'
import * as prodServ from '../components/controllers/productos.controllers'
import Navigation from "../components/Navigation";

function Myapp({ Component,pageProps}:AppProps) {
  const [sidebar,setSidebar] = useState<boolean>(false)
  const [loader,setLoader] = useState<boolean>(true)
  const [navBar,setNavBar] = useState<boolean>(false)
  const [state,dispatch] = useReducer<Reducer<AppData,ReducerAction<any>>>(appReducer,initialApp)
  
  const loaderCTRL = (param:string)=>{
    const locationBar = document.location.pathname
    if(param !== locationBar || param === 'load'){
      setLoader(true)
      return
    }
    setLoader(false)
  }
   const getAppData = async()=>{
     const req = await fetch(process.env.API+`/app`)
     const res = await req.json()
     dispatch({
       type:'get_app_data',
       payload:res
     })
   }

  const updateApp = async(app:AppData)=>{
    const req = await fetch(`${process.env.API}/app`, {
            method: 'put',
            body: JSON.stringify({ newData: app }),
            headers: {
                "content-type": "application/json"
            }
        })
    const res = await req.json()
        dispatch({
          type:'update_app_data',
          payload:res
        })
  }
  
    const getTasaCambio = async()=>{
      try{
        const req = await fetch(process.env.API+`/app/tasacambio`)
        const res = await req.json()
          dispatch({
            type:'get_tasa_cambio',
            payload:res
          })
      }catch(err){
        return
      }
    }

  const updateTasa = async({monto,_id}:any)=>{
    const req = await fetch(`${process.env.API}/app/tasacambio`, {
            method: 'put',
            body: JSON.stringify({ monto, _id}),
            headers: {
                "content-type": "application/json"
            }
        })
        const res = await req.json()
        dispatch({
          type:'update_tasa_cambio',
          payload:res
        })
  }

  const getAccesorios = async (search:string,limit:number)=>{
    try{
      const {accesorios,count} = await accServ.getCustomAccesorio(search,limit)
    
      dispatch({
        type:'get_accesorios',
        payload:{
          data:accesorios,
          count
        }
      })
    }catch(err){
      return
    }
  }
  const getRepuestos = async (search:string,limit:number)=>{
    try{
      const {repuestos,count} = await repServ.getCustomRepuesto(search,limit)
      dispatch({
        type:'get_repuestos',
        payload:{
          data:repuestos,
          count
        }
      })
    }catch(err){
      return
    }
  }
  const getProductos = async ()=>{
    try{
      const res = await prodServ.getProductos()
      dispatch({
        type:'get_productos',
        payload:{
          data:res
        }
      })
    }catch(err){
      return
    }
  }
  return <GlobalAppContext.Provider value={{
    loader,
    appData:state.appData,
    accesorios:state.store.accesorios,
    productos:state.store.productos,
    repuestos:state.store.repuestos,
    tasaCambio:state.tasaCambio,
    sidebar,navBar, setNavBar,setSidebar,loaderCTRL,getAppData,updateApp,getTasaCambio,updateTasa,getAccesorios,getProductos,getRepuestos
    }}>
        <Head>
            <link rel="manifest" href="/site.webmanifest.json" />
            <meta name="author" content="Diaz web app" />

            <link rel="apple-touch-icon" href="/logo512x512.png" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        </Head>
        <Header />
        <Navigation />
        <Component {...pageProps} />
        <Footer />
        {
          loader ?(
            <div style={{display:'flex',zIndex: 6000,position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0, .7)',color:'white',justifyContent:'center',alignItems:'center' }} >
              loading
            </div>
          ):null
        }
    </GlobalAppContext.Provider> 
}

export default Myapp