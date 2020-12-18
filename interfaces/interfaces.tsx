export type Accesorio = {
    _id?:string
    nombre: string
    color: string
    estado: boolean
    imagenes: {
        imagen1?:string
        imagen2?:string
        imagen3?:string
    }
    modelo: string
    precio: number
    producto: string
    createdAt?:string | Date
    updatedAt?:string | Date
}

export type Repuesto = {
    _id?:string
    nombre: string
    color: string
    estado: boolean
    imagenes: {
        imagen1?:string
        imagen2?:string
        imagen3?:string
    }
    modelo: string
    precio: number
    producto: string
    createdAt?:string | Date
    updatedAt?:string | Date
}

export type Producto = {
    _id?:string
    nombre: string
    seccion:string
    estado: boolean
    createdAt?:string | Date
    updatedAt?:string | Date
}

export type Context = {
    appLoader: boolean
    setAppLoader: (param:boolean)=>boolean
    appLocation: string
    setAppLocation: (param:string)=>string
    verifySesion:()=>User
    destroySesion:()=>User | void
    app:App
    setApp:(param:any)=>App
    tasaCambio:TasaCambio
    setTasaCambio:(param:TasaCambio)=>TasaCambio
}

export type User = {
    nombre?:string
    apellido?:string
    correo:string
    password:string
    estado?:boolean
    foto?:string
    rango?:string
    createdAt?:string | Date
    updatedAt?:string | Date
}

export type App = {
    name:string
    description:string
    keywords?:string
    addres?:string
    contact:{
        phone?:string
        whatsapp?:string
        email?:string
        facebook?:string
        instagram?:string
        telegram?:string
        twitter?:string
    }
    logo:string
}

export type TasaCambio={
    monto:number
    _id?:string
}