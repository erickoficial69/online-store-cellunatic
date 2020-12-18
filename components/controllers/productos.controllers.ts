import { Producto } from "../../interfaces/interfaces"
import fetch from 'isomorphic-fetch'

const API:any = process.env.CELLUNATICBACKEND || 'http://localhost:3001'

export const updateProducto = async (producto:Producto) => {
    const newData =producto
    const get = await fetch(`${API}/productos`,{
        method:'put',
        body: JSON.stringify({newData,id:producto._id}),
        headers:{
            "content-type":"application/json"
        }
    })
    return  await get.json()
}

export const getProductos = async()=>{
    const get = await fetch(`${API}/productos`)
    return await get.json()
}

export const deleteProducto = async(id:string)=>{
    const get = await fetch(`${API}/productos/${id}`,{
        method:'delete',
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}

export const createProducto = async(param:Producto)=>{
    const get = await fetch(`${API}/productos`,{
        method:'post',
        body:JSON.stringify({newData:param}),
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}