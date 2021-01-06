import { Accesorio } from "../../interfaces/interfaces"
import fetch from 'isomorphic-fetch'

export const toBase64 = (file:any) => new Promise((resolve,reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = err => reject(err)
})

export const updateAccesorio = async (accesorio:Accesorio) => {
    const newData =accesorio
    const get = await fetch(`${process.env.API}/accesorios`,{
        method:'put',
        body: JSON.stringify({newData,id:accesorio._id}),
        headers:{
            "content-type":"application/json"
        }
    })
    return  await get.json()
}

export const createAccesorio = async (accesorio:Accesorio) => {
    
    const newAccesorio = {
            color: accesorio.color,
            imagenes: accesorio.imagenes,
            modelo: accesorio.modelo,
            nombre: accesorio.nombre,
            precio: accesorio.precio,
            producto: accesorio.producto
    }
    
    const get = await fetch(`${process.env.API}/accesorios`,{
        method:'post',
        body: JSON.stringify({newAccesorio}),
        headers:{
            "content-type":"application/json"
        }
    })
    return  await get.json()
}

export const deleteAccesorio = async(accesorio:Accesorio)=>{
    const get = await fetch(`${process.env.API}/accesorios/${accesorio._id}`,{
        method:'delete',
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}

export const getAccesorio = async(id:string)=>{
    const get = await fetch(`${process.env.API}/accesorios/detail/${id}`)
    return await get.json()
}

export const getAccesorios = async(limit?:number)=>{
    const get = await fetch(`${process.env.API}/accesorios/${limit}`)
    return await get.json()
}

export const getCustomAccesorio = async(search:string,limit:number)=>{

    const get = await fetch(`${process.env.API}/accesorios/filter`,{
        method:'post',
        body:JSON.stringify({search,limit}),
        headers:{
            "content-type":"application/json"
        }
    })
    return await get.json()
}