import {AppProps} from "next/app";
import Head from 'next/head'
import {useReducer,Reducer, ReducerAction, useState } from 'react'
import GlobalAppContext,{initialApp} from "../context/app/app_state";
import appReducer from '../context/app/app_reducer'
import { AppData } from '../interfaces/interfaces'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as accServ from '../components/controllers/accesorios.controllers'
import * as repServ from '../components/controllers/repuestos.controllers'
import * as prodServ from '../components/controllers/productos.controllers'
import Navigation from "../components/Navigation";
import './effect.css'

/*
NextWebVitalsMetric se importa de next/app
  export function reportWebVitals(metric:NextWebVitalsMetric) {
    console.log()
} */

function Myapp({ Component,pageProps}:AppProps) {
  const [loader,setLoader] = useState<boolean>(true)
  const [navBar,setNavBar] = useState<boolean>(false)
  const [buscador,setBuscador] = useState({
    activo:false,
    handler:()=>{}
  })
  const [state,dispatch] = useReducer<Reducer<AppData,ReducerAction<any>>>(appReducer,initialApp)
  
  const loaderCTRL = (param:string | boolean)=>{
    const locationBar = document.location.pathname
    if(param !== locationBar){
      setBuscador({activo:false,handler:()=>{}})
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
    navBar,buscador,setBuscador,setNavBar,loaderCTRL,getAppData,updateApp,getTasaCambio,updateTasa,getAccesorios,getProductos,getRepuestos
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
<div className="origin">
  <div className="control">
    <div className="galaxy">
      
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
    </div>
  </div>
</div>
        <style jsx global>
          {
            `
            @font-face {
              font-family: 'cellunatic';
              src:url('/fonts/coursive2.ttf');
          }
          *{
              margin:0;
              padding:0;
              scroll-behavior: smooth;
              box-sizing: border-box;
              text-decoration: none;
              outline: none;
              list-style: none;
              border:none;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              color:var(--font-color);
          }
          *::before,
          *::after {
            margin: 0;
            border: 0;
            padding: 0;
            box-sizing: border-box;
          }
          :root{
              --height-header:55px;
              --secondary-color:orange;
              --alfa:rgba(0,0,0, .3);
              --darken:rgba(0,0,0, .9);
              --primary-color:rgba(5, 5, 5, .8);
              --font-color:white;
              --shadow:0px 0px 2px var(--secondary-color);
              --radius:8px;
          }
          h1{
            font-size:2em;
          }
          
          header{
              position: fixed;
              height:var(--height-header);
              top:0;left:0;right:0;
              background: var(--primary-color);
              z-index: 10;
          }
          .container,main{
              width:98%;
              max-width: 1280px;
              position: relative;
              margin: 0 auto;
          }
          button{
              border-radius:4px;
              box-shadow: var(--shadow);
              background: var(--primary-color);
              margin: 5px;
              padding: 4px 6px;
              text-transform: uppercase;
              cursor: pointer;
          }
          main{
              display: grid;
              grid-template-columns: 1fr;
              margin: var(--height-header) auto;
              padding: 10px 0;
              gap: 10px;
          }
          main > section{
              width:100%;
              position:relative;
          }
          
          /*creador de items*/
          .component_new_item{
            position:fixed;
            z-index:10;
            display:grid;
            grid-template-columns: 1fr;
            overflow:auto;
            top:var(--height-header);
            bottom:var(--height-header);
            left:10%;
            right:10%;
            padding:20px 0px;
          }
          .component_new_item > div{
            margin:3px auto;
            background:var(--primary-color);
            width:100%;
            border-radius:var(--radius);
            box-shadow:var(--shadow);
            padding:5px;
          }
          .component_new_item .form{
            display:flex;
            flex-flow:column;
          }
          .component_new_item .form div, .component_new_item > div > div div{
            display:grid;
            grid-template-columns: 120px 1fr;
            margin:5px 0;
          }
          .component_new_item .form div > *{
            width:100%;
            background:transparent;
            padding:5px;
            box-shadow: var(--shadow);
            background:var(--primary-color);
            border-radius:var(--radius);
          }
          .component_new_item .form div > label{
              box-shadow: unset;
          }
          /* Barra header*/
          .header_barr{
              display: flex;
              flex-flow: row nowrap;
              justify-content: space-between;
              align-items: center;
              height:var(--height-header);
          }
          .header_barr .logo{
              color:var(--secondary-color);
              display: flex;
              align-items: center;
              justify-content: space-between;
          }
          .header_barr .logo b{
              display: none;
          }
          .nav_header{
              width:auto;
          }
          .nav_header .btn_login{
              display: none;
          }
          .header_barr > form{
              width:50%;
              text-align: center;
          }
          .header_barr .search_items_store{
              background: rgba(0,0,0, .1);
              border-radius: var(--radius);
              padding: 4px;
              box-shadow: var(--shadow);
              width: 90%;
          }
          
          /*/////////////////////////*/
          /*Nav y aside*/
          nav.principal,.effect_menu{
              width:250px;
              position: fixed;
              top:0;
              left: 0;
              bottom: 0;
              overflow-y: auto;
              overflow-x: hidden;
              background: var(--primary-color);
          }
          nav.principal,.effect_menu{
            z-index: 13;
          }
          .effect_menu{
              width: 100vw;
              right: 0;
              background-color: rgba(0,0,0, .8);
          }
          aside{
              display: none;
              width:250px;
              background:var(--primary-color);
          }
          aside > h3, nav.principal > h3{
              height: var(--height-header);
              line-height: var(--height-header);
              text-transform: uppercase;
              border-bottom: 1px solid var(--darken);
              padding: 0 3px;
          }
          
          aside a,nav.principal a{
            display:block;
            padding:8px 3px;
            border-bottom:1px solid var(--secondary-color);
            text-transform: uppercase;
          }
          aside > ul li:hover, nav.principal > ul li:hover{
            background:var(--alfa);
          }
          /*/////////*/
          .coursive{
              font-family: 'cellunatic' !important;
          }
          /* Intro de la web*/
          .intro{
              width: 100%;
              height: calc(100vmax - var(--height-header));
              max-height: 512px;
              display:flex;
              flex-flow: row wrap;
              justify-content: center;
              align-items: center;
              align-content: center;
          }
          .intro > img{
              width:280px;
              height:280px;
          }
          
          .intro > div p, .intro > div > h1{
              text-align: center;
              margin: 5px auto;
          }
          .intro > div > h1{
              font-size: 2.5em;
          }
          
          .intro > div > p{
              font-size: 1.5em;
          }
          nav.botonera{
              margin: 10px auto;
          }
          nav.botonera > button{
              background-color: var(--primary-color);
          }
          /*//////*/
          /*///////Container item///////*/
          .container_items{
              display: grid;
              grid-template-columns: repeat(2,1fr);
              place-items: center;
              place-content: center;
              gap:10px;
          }
          .item{
              border-radius:var(--radius);
              position:relative;
              box-shadow:var(--shadow);
              width:100%;
              height:250px;
              background:var(--font-color);
              overflow:hidden;
              cursor:pointer;
              text-align:center;
          }
          .copy_article > p{
            padding:10px 20px;
          }
          @media(min-width:480px){
              /*Intro*/
              .intro > img{
                  width:40vmin;
                  height:40vmin;
              }
              .intro > div:first-child{
                  width:50%;
              }
              /*/////////////*/
              .items{
                  height: 300px;
              }
              .component_new_item .form div, .component_new_item > div > div div{
                  grid-template-columns: 140px 1fr;
                }
          }
          @media(min-width:512px){
              /*intro*/
              .intro > img{
                  width:250px;
                  height: 250px;
              }
              /*////////*/
              .container_items{
                  grid-template-columns: repeat(3,1fr);
              }
          }
          @media(min-width:720px){
              /*Intro*/
              .intro > div > h1{
                  font-size: 3.5em;
              }
              /*///*/
          
              /*barra header*/
              .header_barr .logo b{
                  display: contents;
              }
              .nav_header .btn_login{
                  display: contents;
              }
              .nav_header .btn_filter{
                  display: none;
              }
              /*//////*/
              .container_items{
                  grid-template-columns: repeat(4,1fr);
              }
              .component_new_item .form div, .component_new_item > div > div div{
                  grid-template-columns: 200px 1fr;
                }
          }
          @media(min-width:1024px){
              main{
                  grid-template-columns: 250px 1fr;
              }
              main > section{
                grid-column:2/span 1;
              }
              aside{
                  display: block;
                  height:max-content;
                  position: fixed;
              }
              .full_width{
                  grid-column: 1 / span 2;
              }
              .component_new_item{
                  max-width: 500px;
                  left:calc(50% - 250px);
              }
          }
          
          @media(min-width:1080px){
              main,.container{
                  width: 80%;
              }
          }`
          }
        </style>
    </GlobalAppContext.Provider> 
}

export default Myapp