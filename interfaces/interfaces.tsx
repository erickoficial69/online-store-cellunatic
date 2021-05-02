export type Accesorio = {
    _id?:string
    nombre: string
    color: string
    description?:string
    keywords?:string
    estado: boolean
    imagenes: {
        imagen1?:string
        imagen2?:string
        imagen3?:string
    }
    url?:string
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
    description?:string
    keywords?:string
    estado: boolean
    imagenes: {
        imagen1?:string
        imagen2?:string
        imagen3?:string
    }
    url?:string
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
    url?:string
    estado: boolean
    description?:string
    keywords?:string
    createdAt?:string | Date
    updatedAt?:string | Date
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

export type Seccion= {
    _id?:string
    title:string,
    url?:string,
    description?:string
    keywords?:string
    createdAt?:string | Date
    updatedAt?:string | Date
}

export type AppData = {
    appData:{
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
    },
    tasaCambio:{
        monto:number
        _id?:string
    },
    store:{
        accesorios:{
            data:Accesorio[],
            count:number
        },
        repuestos:{
            data:Repuesto[],
            count:number
        },
        productos:{
            data:Producto[],
            count?:number
        }
    }
}