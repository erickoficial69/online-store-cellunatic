import {createContext} from 'react'
import { AppData } from '../../interfaces/interfaces'

export const initialApp:AppData={
    appData:{
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
    },
    tasaCambio:{
      monto:0
    },
    store:{
      accesorios:{
        data:[],
        count:0
      },
      repuestos:{
        data:[],
        count:0
      },
      productos:{
          data:[],
          count:0
      }
    }
  }

const GlobalAppContext = createContext({})

export default GlobalAppContext